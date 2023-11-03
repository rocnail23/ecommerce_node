'use strict';

const { QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn("ProductCarts", "purchase_id",{
        type: Sequelize.INTEGER,
        references:{model:"Purchases",key:"id"},
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn("ProductCarts", "purchase_id")
  }

};
