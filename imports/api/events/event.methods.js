import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Email } from 'meteor/email';
import moment from 'moment';
import Events from './event.model.js';
import Friends from '../friends/friend.model.js';
import rateLimit from '../../modules/rate-limit.js';
import { isFriendMailInList, isFriendMailInExpense } from '../../modules/debt-utils';

const eventSimpleSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  name: {
    type: String,
    optional: false,
  },
  date: {
    type: Date,
    optional: false,
  },
  completed: {
    type: Boolean,
    optional: false,
  },
  ownerId: {
    type: String,
    optional: false,
  },
  owner: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  'expenses.$._id': { type: String, optional: true },
  'expenses.$.name': { type: String, optional: false },
  'expenses.$.amount': { type: Number, optional: false },
  'expenses.$.friends': { type: Array, optional: false },
  'expenses.$.friends.$': { type: Object, optional: false },
  'expenses.$.friends.$._id': { type: String, optional: false },
  'expenses.$.friends.$.firstname': { type: String, optional: false },
  'expenses.$.friends.$.lastname': { type: String, optional: false },
  'expenses.$.friends.$.email': { type: String, optional: false },
  'expenses.$.friends.$.ownerId': { type: String, optional: false },
  'expenses.$.friends.$.userId': { type: String, optional: true },
  'expenses.$.friends.$.gavatar': { type: String, optional: true },
  'expenses.$.friends.$.paidExpense': { type: Boolean, optional: true },
});

export const upsertEvent = new ValidatedMethod({
  name: 'events.upsert',
  validate: eventSimpleSchema.validator(),
  run(event) {
    const eventUpdate = event;
    const ownerAsFriend = Friends.findOne({
      userId: this.userId,
      ownerId: this.userId,
    });
    eventUpdate.owner = ownerAsFriend;
    return Events.upsert({ _id: eventUpdate._id }, { $set: eventUpdate });
  },
});

const findFriendsInEvent = (event) => {
  const friends = [];
  for (const expense of event.expenses) {
    for (const friend of expense.friends) {
      if (friend.userId !== event.ownerId && !isFriendMailInList(friends, friend)) {
        friends.push(friend);
      }
    }
  }
  return friends;
};

const buildMailContent = (event, friend) => {
  let content = '<div>';
  let totalOwed = 0;
  content += `<h1>${event.name} (${moment(event.date).format('DD/MM/YYYY')})</h1>`;
  for (const expense of event.expenses) {
    if (isFriendMailInExpense(expense, friend)) {
      content += `<h2><strong>${expense.name} ${expense.amount}${Meteor.settings.public.application.currency}</h2>`;
      content += `<h3>Participants (${expense.friends.length}) : </h3>`;
      content += '<ul>';
      for (const participant of expense.friends) {
        content += `<li>${participant.firstname} ${participant.lastname}</li>`;
      }
      content += '</ul>';
      totalOwed += expense.amount / expense.friends.length;
    }
  }
  const ownerName = `${event.owner.firstname} ${event.owner.lastname}`;
  content += `<h2>Total : ${totalOwed.toFixed(2)}${Meteor.settings.public.application.currency} to ${ownerName}</h2>`;
  content += `You can confirm the payment of these expenses by heading toward your dashboard : ${Meteor.settings.public.application.url} and clicking the icon next to the amount.<br />`;
  content += '<em>(A Google email is required to authenticate)</em>';
  content += '</div>';
  return content;
};

export const mailFriendsWithExpenses = new ValidatedMethod({
  name: 'events.email.friends',
  validate: eventSimpleSchema.validator(),
  run(event) {
    if (Meteor.isServer) {
      const friends = findFriendsInEvent(event);
      for (const friend of friends) {
        const to = friend.email;
        const cc = event.owner.email;
        const from = 'Expense manager';
        const subject = `${event.name} (${moment(event.date).format('DD/MM/YYYY')})`;
        const html = buildMailContent(event, friend);
        const attachments = [
          {
            filename: 'How to confirm payment.png',
            content: 'iVBORw0KGgoAAAANSUhEUgAAAKQAAABcCAYAAADgdB41AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QYZDwI4ovUSEwAAELZJREFUeNrtnXtsVdWexz/7cd590ZbSUoFSoLb0AdphIIOaWxkQiTEiCl4TEUYNM2lCQDH+MUqMZBzFGDSYaIIODw25OsaIzDU+QBljCDLqXEZArKSCoBZ59XV6XnvvNX+sfeip9N1DKbC+yU7oPmuv/frs3/o91t5oQgiBktIIka4ugZICUklJAamkgFRSUkAqKSCVlBSQSgpIJSUFpJICUklJAamkpIBUUkAqKSkglRSQSkoKSCUFpJKSAlJJAamkpIBUUkAqKSkglZQUkEoKSCUlBaSSAlJJSQGppIBUUlJAKl29Mq+IoxRCLgBooGmg9boBCGS7oe88Zf/Jfaej3wQ2FjZg4MG4Qm7FNQykAMcBywLbAeGAcGEwDHfRu8LhOODYbnshf9N1uSQhFnS2AdB00JN9pe4+2Ze7OC6Qug6G2bn/QamN8y3/w9bPX+WjM7/TSgIHJ413NYfyyat47qb5FF5hQGoj8/uQAqwExKIQjUEiAbZ7mLoBHg/4fOD1gmlIkBxHbhOPQzwhgdN08HjBY7rwOJCwZDvLlh6L6elsY7rgCgdsCxLxzv4sWz4Qpgk+P/j94PMOAkqb9uhBXt/xL7xy/CTNjo3uJIg4EWzsNIEZI2bDtDnf87ebypWFHLIcG2Id0NoGbS0QjkkgNBcgfwAysiAzKKHQ6AS4vR3CEWlZMSQ8QT/4vWAnIBqBjihYjgTSF4BQCAJ+8Jou3C6MkQhEOqAjArGEbO/xQSgDcnLkw6HrfbgPf1SU1vj3/O/5KHbBSv666M9UZGQT1PwYGGikwR2w/sL85/7Mx8f20XxTOTkKyKEaSNfaRcLQ3gHhMETjctg0vRDMkO08BmhCAhGPQXsrtLRCW1gCpOkSyFAQvIYEPdIBkSgkbDC84A9KC+hkguWRfdlx2a69DVpaIByFuAVCl/u2NPAEpJX0mGAMBCKLhGVjaQZBTy6jQwVkaZ4031U/fuVDptWTkD6a1yOHZF2TMCUsadl0UwKXSEgYNEdavvZ2CLdDuEMO8Y4D0ShEO6T1EwkJVsKWviTJoRs5XNted1iPShjPnYXmVtdCOuDxg61BMDPFrxyw+cdBoIkEEdHC6bYmcjNzCOl+TMz0WEgV1KQ7GWWA1y+HZXQJJ0KClhCgGXK94/p6woZ4FGIxiMU7h/3k71YMOlKib/TOodaOQywCHR45VGNLy9xyBs6cg/PNEI7LSxXSIUNIX1LXLri7A/WPLQFYFm2N/86CV9ZjaDZRJ0qCBIL0uPQxWwE5BJ/R6UzT6JrrK3rBL+S/HVv6h7G49As9Jvg8LhRCgmTFXb9Rk4vHBSwadaFNRsku7KbZGXVbtoQZG4QlrWxzK7Sch/OtrnUMQsC1rKbuHqfGwA2awBECR7TTJk4Ts1SqZ+QA6TjS90tYKbC4kbNuyAAmlnBvPi6MXvAFUyLnZIrGclNDyCFdExIwXcgh2nZcUDVZDkimgpJDu22DBdgxGVB1RGRwFInK9boPnCTv7oNjDC4nqcmnQNE3ooB0bIi0wdmz0B4BzQOhbBiVLaNi3R0PNTdVk7DcNI0PAj4JpmGAZncmrxGdwFwAJyW5nTrEaq4l1pzO9Y7TCafjSMvpODKY0ZPW2+xqHQfh8jlCQ1zjvuLIA1IIiIfh/O/QEgUjKKHMzJTBgoZrteLSYsVcIH1eNwfpkRZSOBf3K3AtZCp8SQC1zlxnF4Bd6ITRmfj2euS/SbGoyYhaCHmcyQT8wEI2NC1EkEx0XUcjge3YxImnzYdUQA4ikMYIQGgUaFE5JAYDKRUTIYfTWFSmXSwHdC94gzIPmUyIC00uqRZHWOBoLjQ6GB7XEmqyf8e1hrojL4FhyP48BhjIVFAwCMEQRBPShzQNCWMSRDsJ5CBOXNPQjCA5xf/Ev/3jAib6s/DiRU/X1AJrD6veWM1/KyAHGEkHs2Csr9OHND0yGDHcaolwk92WIyNrrx9CAfC5/qOwUwIi001Uu2BalvzN8MjlglV0raXjSJ/UTAZJXtkvpoTXisrjsh3oiEu/1DDkPhPufp2UGvcAgNQ0HWEGCAQquXHsP3C9NyPNF/cYOYaykAO3FKYLli8FFD1lSBRu7lE3ZGI7GJJW1OsmxKMJt6zngO6RVRSPLa1XMrgxUqBz3LZ2EmI3mvf5iZk6Hr8fXU8m3DVpZQ1TBjhxp3M9LpRdJn30/7x1TVpaTTfxGD7lOI6otI+my2GyO2B1txbtd61iZjZk+CRcwnL9RBcaw03jaDpoHWCJzqjd75epGmHLNFDCnTDhlhbjpskPTb/x+Vdf8fc3Tmd84RjygkH8Ba5V7oh0Vmp8PvkgmVpncDPQUxYyQW4JVGhzRSTGk0O64ZMQmgHpP4YyZE1aR1ovrx80qzNR7fdJ+AJBd3KFC5TPlFbStmR1JxrrMvnCG8wg3PQb//nX/+KVzf9BVUUF5ZNLqZ48ieqSEsZmZpCTlYOhmeD1yfJhMCAfDF0bsIWU8zcsWehxHDDcAEtNTx3J0880OQRnGZDh3i/DnZEDbirG6MwvJqer2UHIcH0/dNctSAZAycpNSl7S9IDXQ8X0aSxatIhHH3+co42NGLpOfl4e140toqqsjLKSidxYVcWU0skUjMohMzM4SCBB1zWEY+MI0EWMpiNrWXPwuMxM+ufz9B3LKG/+C6t2vU9T6obJ3xSQl9FK6j1451oyeZ7iwwncQCclHdNlQm0yMnZSJtzqYOjkhILctmABcz76iN27d2M7DqdOn+bU6dN8c+D/CPj9FIweTenEiVRVVlFeUcENf1fL+PHjycvLw+/39/tBMzUdHAsHDQODppNfsuPIt0RsG0I5/PMdyyhv38f7h97meOqmyd8UkCNYqT6c5p5SbxGmQdeIO0UlJSU8/PDD7N27l0gk0uW3SDTK8RMnOH7iBJ9/8QXZ2dkUFRVRXl5ORUUFlZWV1NTUUFRUxKhRozAMo8cD0DRZ7kwAmm5Q86dP+P2mKDEM/MmZOtc9x5F/fZpoSkHHfwXP4rl2gBxSIrSrgsEgs2bN4p577uHNN9/sdeuWlhZaWlo4cuQIO3fuJC8vj3HjxlFdXU1ZWRk1NTWUl5dTUFBAZmZml0seNHV0J0okeo7TiRi5AS8eM5tAl9vhlwAO5g5Fm4naso8r7q6MzBnjl0+JRII9e/awdOlSmpqaBtWH3++noKCA0tJSampqKCsrY/r06ZSUlJCXl4ejHWXbe3fz1LFTdFgOAhvLsUiQSOOZ+Jg2529X3IxxBWQ3OnXqFBs2bOD5559PS39ZWVmMHTuW8vJyqqurmT17BjffnMe2z15lZ/NpwlY0jUcvLWvJ5FU8PetPV9w7NQilbrVv3z5RWVmZzMekbdE0TaxZs0a0trYKIWLCEpZwhKMuuCuV+OpB5eXlLFu2DF1P7yUKBoOMHj2aUCgEeNP3Hs1VIgVkD8rOzsbj8ZCdnZ3WfkePHk1tbW3aQVdR9lWs5uZmXnnlFV577TVaWlrSbnknTZqkLrICsn86evQoW7du5a233uKXX35Ja9+GYVBWVkZhYaG60ArIvnX69Gk2b97Mxo0baWtrS3v/mZmZVFdXD6Cqo4C8ZnXy5EnWrVvH1q1bicVil2QfxcXF1NTUqIutgpq+LeMbb7zBzp07LxmMAJWVlUyYMEFdcGUhe5YQgm3btvHCCy8QDocv2X58Ph9TpkwhLy9vyH1pbv0+WdP449+D6UNZyBGgeDzO9u3b2bJlCx0dHZd0Xzk5Odxwww2YZu824NNPP2XRokUUFxfj9XrJzMyktLSUO++8Uw3ZV7saGhrYuHEjBw8evOSWYuLEiVRUVPTaZtWqVcybN49Ro0axZ88ewuEwR48eZf369b1abyEEV0sF2Dx79uyIOiCtm1cC/rhO6+G1gdSb0ls/QgiamprYsGED33333bCc16RJk/D7/fR0vd9++21efvll5s+ff6GG3traimma1NXVUVdXd9G2yb/z8/MBOHPmzIXfvv/+e1588UX27t3LuXPnKC0t5bHHHmPRokXd9rF//36WLFlCW1sba9euZeXKlWlxLwbjQ12T2rJliwiFQmmvVXe3hEIhsX79+l6PZ+bMmQIQX375ZZ/Hnuy3p7/3798vAoGAGDdunNi1a5cIh8Pi8OHD4v777+92m127dolQKCQMwxCbNm26rPflmgTy0KFDYu7cucIwjGEBcsKECWLXrl29HlMwGBSAOHfu3JCBnDNnjgDE+++/32cfO3bsED6fT/h8PvHuu+9e9ntzzQEZDofFunXrhgXE5HLbbbeJxsbGYQOyP30lt/F4PAIQ77zzjprtcznU2NjIhx9+OGz7MwyDiooKioqKem1XVVUFwOHDhy+pP/5HbdiwAU3TeOaZZ/j1119VlD2cSiQSfPDBBxw8eDAt/fn9fgKBQK9tsrKymDp1ap/lwvr6egDWr18/5OOaNWsWAF988UWfbevr63n11Vc5dOgQs2fP5scff7zsieFrRidOnBAzZswY8hBsGIbIzc0Vd999t3jqqacuDJHdLVOnThVfffVVv45v5cqVAhAPPfSQaGhoELFYTPz000/ivffeE3PmzOn3kL1v3z7h9/vFhAkTxGeffSY6OjrEDz/8IJYtW9bjNps2bRKapomCggLxzTffKB9yOLRjxw6RnZ09ZBhra2vFtm3bRCQSEY2NjWLp0qU9tl+8eLH47bff+n2MH3/8sVi4cKEoKioSpmmKQCAgxo8fLxYsWNBvIIUQ4sCBA+Lee+8VBQUFwjRNMXXqVLF9+/Zet9m8ebPQdV1kZmaK3bt3KyAvdTBTX18/JBizs7PFmjVrRENDg0gkEkIIISzLEp988okoLCy8qL3P5xNPPvmksCxLvZuggpquOn78OF9//fWgt589ezavv/46TzzxBJMmTbpQAjQMg5qaGh588MFuy4XTpk3r5R1tpWs2qPn5558H5bDn5ubywAMPsHbtWubPn09+fv5Frx+MGTOGhQsXUllZ2WV9SUlJn+VCpWsUyAMHDtDa2jqglEl+fj533XUXjz/+OPPmzSMjo+fvOF5//fU88sgjXVItNTU1XHfddYoyBWRXRSIRDh06hGX1/0PzWVlZrFy5kpdeeonq6uo+2+fk5DB37lxuvfVWAEKhEFOmTEn7S2IKyKtA58+fp6Ghod/tJ0+ezLPPPkt9fX2vVvGPSn4byOfzkZ+fz/Tp0xVhA9Q1MUG3paWl31WIwsJCli5dyuLFi8nNzR3QflK/DXTy5En1dqECsnsdO3asX+2ys7NZvXo1q1evxuMZ3P8/WFxczPLly/n222/V24UKyIslhCAej9Pc3Nynz7h8+XKWLFkyaBgBPB4PtbW1VFVVqbcLFZDdR8tnzpzpc6JBXV0djz76KOPGjRvyPnNychRZKqjp2ULatt3rFyhmzJjBihUrGDt2rCJCAXnpLWRbWxtZWVk9BiLLly/n9ttvVxUVBeSll+M45OTkdJsU13WdO+64g3nz5ikSFJDDdIK6TkdHR7d+3fjx41mxYoVKzyggh1fFxcW0t7dftP6WW26htrZWUaCAHP5he8yYMV3WlZWVcd9996nSngJy+FVSUoJlWV1SP7NmzWLmzJmKAAXk8Ms0TQoLCy98SMDn81FXV9dj5K2kgLykGjNmDPn5+RcsZE1NDTfffHOf39lRUkBeEuXn53exkNOnT1eRtQLy8smyrC4fCp09e7a68yNU/w/vtCeSJHN55gAAAABJRU5ErkJggg==',
            encoding: 'base64',
          },
        ];
        Email.send({ to, cc, from, subject, html, attachments });
      }
    }
  },
});

export const markCompleted = new ValidatedMethod({
  name: 'event.mark.completed',
  validate: new SimpleSchema({
    _id: {
      type: String,
    },
  }).validator(),
  run({ _id }) {
    return Events.update({ _id }, { $set: { completed: true } });
  },
});

export const removeEvent = new ValidatedMethod({
  name: 'events.remove',
  validate: new SimpleSchema({
    _id: {
      type: String,
    },
  }).validator(),
  run({ _id }) {
    Events.remove(_id);
  },
});

rateLimit({
  methods: [upsertEvent, removeEvent],
  limit: 5,
  timeRange: 1000,
});
