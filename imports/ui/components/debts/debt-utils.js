export const isFriendMailInList = (friends, targetFriend) => {
  let found = false;
  for (const friend of friends) {
    if (friend.email === targetFriend.email) {
      found = true;
    }
  }
  return found;
};

export const isFriendMailInExpense = (expense, targetFriend) =>
  isFriendMailInList(expense.friends, targetFriend);

export const userIsFriend = friend => friend.userId && Meteor.userId() === friend.userId;
