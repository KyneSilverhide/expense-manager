export const isFriendMailInList = (friends, targetFriend) => {
  let found = false;
  for (const friend of friends) {
    if (friend.email === targetFriend.email) {
      found = true;
    }
  }
  return found;
};

export const isExpensePaidByFriend = (expense, targetFriend) => {
  let paid = false;
  for (const friend of expense.friends) {
    if (friend.email === targetFriend.email && friend.paidExpense) {
      paid = true;
    }
  }
  return paid;
};

export const isFriendMailInExpense = (expense, targetFriend) =>
  isFriendMailInList(expense.friends, targetFriend);

export const userIsFriend = friend => friend.userId && Meteor.userId() === friend.userId;
