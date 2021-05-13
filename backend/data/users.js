import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'User1',
    email: 'user1@user.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'User2',
    email: 'user2@user.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
