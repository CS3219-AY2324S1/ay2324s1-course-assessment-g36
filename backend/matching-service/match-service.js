/**
 * A user is represented by its WebSocket object.
 * @typedef {import("ws").WebSocket} User
 */

export class MatchService {
  /**
   * @type Map<string, Set<User>>
   */
  _complexityToUsersSetMap = new Map();

  /**
   * Gets the set of users in the queue with the corresponding complexity.
   *
   * @param {string} complexity
   */
  _getUsersSet(complexity) {
    if (!this._complexityToUsersSetMap.has(complexity)) {
      this._complexityToUsersSetMap.set(complexity, new Set());
    }

    return this._complexityToUsersSetMap.get(complexity);
  }

  /**
   * Gets the first user added to the queue with the corresponding complexity.
   *
   * @param {string} complexity
   * @returns {User | null}
   */
  getUserFromQueue(complexity) {
    const usersSet = this._getUsersSet(complexity);

    // Get first user inserted into the set.
    const { value: user } = usersSet.values().next();
    if (!user) return null;

    // Remove user from the set once matched.
    usersSet.delete(user);
    return user;
  }

  /**
   * Adds the given user to the queue.
   *
   * @param {User} user
   */
  addUserToQueue(user) {
    const usersSet = this._getUsersSet(user.complexity);
    usersSet.add(user);
  }

  /**
   * Removes the given user from the queue.
   *
   * @param {User} user
   */
  removeUserFromQueue(user) {
    const usersSet = this._getUsersSet(user.complexity);
    usersSet.delete(user);
  }
}
