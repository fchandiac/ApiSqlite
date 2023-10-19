'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('profiles', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { unique: true, type: Sequelize.STRING },
      un_lock: { type: Sequelize.BOOLEAN, defaultValue: false },
      config: { type: Sequelize.BOOLEAN, defaultValue: false },
      products: { type: Sequelize.BOOLEAN, defaultValue: false },
      users: { type: Sequelize.BOOLEAN, defaultValue: false },
      accounting: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }

    }, { underscored: true, initialAutoIncrement: 1001, })

    await queryInterface.createTable('users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      user: { unique: true, type: Sequelize.STRING },
      name: { unique: true, type: Sequelize.STRING },
      pass: { type: Sequelize.STRING },
      profile_id: {
        allowNull: true,
        unique: false,
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'profiles',
          key: 'id'
        }
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }

    }, { underscored: true, initialAutoIncrement: 1001, })

    await queryInterface.createTable('categories', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { unique: true, type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }

    }, { underscored: true, initialAutoIncrement: 1001, })

    await queryInterface.createTable('taxes', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { unique: true, type: Sequelize.STRING },
      value: { type: Sequelize.FLOAT, allowNull: true, defaultValue: 0 },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    }, { underscored: true, initialAutoIncrement: 1001 })

    await queryInterface.createTable('storages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: { unique: true, type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }

    }, { underscored: true, initialAutoIncrement: 1001 })

    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: { unique: true, type: Sequelize.STRING, defaultValue: 'Producto' },
      code: { unique: false, type: Sequelize.STRING, defaultValue: '000000000000' },
      favorite: { type: Sequelize.BOOLEAN, defaultValue: false },
      stock_control: { type: Sequelize.BOOLEAN, defaultValue: true },
      affected: { type: Sequelize.BOOLEAN, defaultValue: true },
      sale: { type: Sequelize.INTEGER, defaultValue: 0 },
      purchase: { type: Sequelize.INTEGER, defaultValue: 0 },
      category_id: {
        allowNull: true,
        unique: false,
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      tax_id: {
        allowNull: true,
        unique: false,
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'taxes',
          key: 'id'
        }
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    }, { underscored: true, initialAutoIncrement: 1001 }
    )

    await queryInterface.createTable('stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      storage_id: {
        allowNull: true,
        unique: false,
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'storages',
          key: 'id'
        }
      },
      product_id: {
        allowNull: true,
        unique: false,
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'products',
          key: 'id'
        }
      },
      stock: { type: Sequelize.FLOAT, defaultValue: 0 },
      critical_stock: { type: Sequelize.FLOAT, defaultValue: 0 },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }

    }, { underscored: true, initialAutoIncrement: 1001 })


    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: true,
        unique: false,
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        defaultValue: 1001,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      amount: { type: Sequelize.INTEGER },
      payment_method: { type: Sequelize.STRING },
      dte_code: { type: Sequelize.INTEGER },
      dte_number: { type: Sequelize.INTEGER },
      stock_control: { type: Sequelize.BOOLEAN },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }

    },
      {
        underscored: true,
        initialAutoIncrement: 1001, // Aparentemente solo funciona para mysql
      })

    await queryInterface.createTable('salesdetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sale_id: {
        allowNull: false,
        unique: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'sales',
          key: 'id'
        }
      },
      product_id: { type: Sequelize.INTEGER, defaultValue: 0 },
      name: { type: Sequelize.STRING, defaultValue: '' },
      quanty: { type: Sequelize.FLOAT },
      sale: { type: Sequelize.INTEGER, defaultValue: 0 },
      discount: { type: Sequelize.INTEGER, defaultValue: 0 },
      subtotal: { type: Sequelize.INTEGER },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    },
      {
        underscored: true,
        initialAutoIncrement: 1001, // Aparentemente solo funciona para mysql
      })

    await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rut: { type: Sequelize.STRING, unique: true },
      name: { type: Sequelize.STRING },
      activity: { type: Sequelize.STRING },
      district: { type: Sequelize.INTEGER },
      city: { type: Sequelize.INTEGER },
      address: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    },
      {
        underscored: true,
        initialAutoIncrement: 1001, // Aparentemente solo funciona para mysql
      })

      await queryInterface.createTable('pays', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        sale_id: {
          allowNull: false,
          unique: false,
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'sales',
            key: 'id'
          }
        },
        customer_id: {type: Sequelize.INTEGER, allowNull: true },
        amount: {type: Sequelize.INTEGER},
        payment_method: {type: Sequelize.STRING, defaultValue: ''},
        state: {type: Sequelize.BOOLEAN, defaultValue: false},
        paid: {type: Sequelize.INTEGER, defaultValue: 0},
        balance: {type: Sequelize.INTEGER, defaultValue: 0},
        date: {type: Sequelize.DATE},
        created_at: {type: Sequelize.DATE},
        updated_at: {type: Sequelize.DATE}
      },
      {
        underscored: true,
        initialAutoIncrement: 1001, 
    })

    await queryInterface.createTable('partialpayments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: { type: Sequelize.INTEGER },
      detail: {type: Sequelize.JSON, defaultValue: []},
      customer_id: {type: Sequelize.INTEGER, allowNull: true },
      user_id: {
        allowNull: true,
        unique: false,
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        defaultValue: 1001,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    },
      {
        underscored: true,
        initialAutoIncrement: 1001, 
      })



    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      state: { type: Sequelize.BOOLEAN, defaultValue: false },
      note: { type: Sequelize.STRING, defaultValue: '' },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    },
      {
        underscored: true,
        initialAutoIncrement: 1001, 
      })

      await queryInterface.createTable('ordersdetails', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        order_id: {
          allowNull: false,
          unique: false,
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'orders',
            key: 'id'
          }
        },
        product_id: { type: Sequelize.INTEGER, defaultValue: 0 },
        name: { type: Sequelize.STRING, defaultValue: '' },
        quanty: { type: Sequelize.FLOAT },
        sale: { type: Sequelize.INTEGER, defaultValue: 0 },
        discount: { type: Sequelize.INTEGER, defaultValue: 0 },
        subtotal: { type: Sequelize.INTEGER, defaultValue: 0 },
        affected: { type: Sequelize.BOOLEAN, defaultValue: true },
        created_at: { type: Sequelize.DATE },
        updated_at: { type: Sequelize.DATE }
      },
        {
          underscored: true,
          initialAutoIncrement: 1001, // Aparentemente solo funciona para mysql
        })
  

    // await queryInterface.createTable('stocks', {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    //   product_id: {
    //     allowNull: false,
    //     unique: true,
    //     type: Sequelize.INTEGER,
    //     onDelete: 'CASCADE',
    //     references: {
    //       model: 'products',
    //       key: 'id'
    //     }
    //   },
    //   room: { type: Sequelize.INTEGER, default: 0 },
    //   warehouse: { type: Sequelize.INTEGER, default: 0 },
    //   created_at: { type: Sequelize.DATE },
    //   updated_at: { type: Sequelize.DATE }
    // },
    //   {
    //     underscored: true,
    //     initialAutoIncrement: 1001, // Aparentemente solo funciona para mysql
    //   })

    // await queryInterface.createTable('salesdetails', {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    //   sale_id: {
    //     allowNull: false,
    //     unique: false,
    //     type: Sequelize.INTEGER,
    //     onDelete: 'CASCADE',
    //     references: {
    //       model: 'sales',
    //       key: 'id'
    //     }
    //   },
    //   price_id: {
    //     allowNull: false,
    //     unique: false,
    //     type: Sequelize.INTEGER,
    //     onDelete: 'CASCADE',
    //     references: {
    //       model: 'prices',
    //       key: 'id'
    //     }
    //   },
    //   product_id: {
    //     allowNull: false,
    //     unique: false,
    //     type: Sequelize.INTEGER,
    //     onDelete: 'CASCADE',
    //     references: {
    //       model: 'products',
    //       key: 'id'
    //     }
    //   },
    //   category_id: {
    //     allowNull: false,
    //     unique: false,
    //     type: Sequelize.INTEGER,
    //     onDelete: 'CASCADE',
    //     references: {
    //       model: 'categories',
    //       key: 'id'
    //     }
    //   },
    //   quanty: { type: Sequelize.FLOAT },
    //   subtotal: { type: Sequelize.INTEGER },
    //   created_at: { type: Sequelize.DATE },
    //   updated_at: { type: Sequelize.DATE }
    // },
    //   {
    //     underscored: true,
    //     initialAutoIncrement: 1001, // Aparentemente solo funciona para mysql
    //   })



   

    // await queryInterface.createTable('deliveries', {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    //   order_id: {
    //     allowNull: false,
    //     unique: true,
    //     type: Sequelize.INTEGER,
    //     onDelete: 'CASCADE',
    //     references: {
    //       model: 'orders',
    //       key: 'id'
    //   }},
    //   phone: {type: Sequelize.STRING},
    //   transfer: {type: Sequelize.BOOLEAN},
    //   address: {type: Sequelize.STRING},
    //   created_at: {type: Sequelize.DATE},
    //   updated_at: {type: Sequelize.DATE}
    // }),

    // await queryInterface.createTable('ordersdetails', {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    //   order_id: {
    //     allowNull: false,
    //     unique: false,
    //     type: Sequelize.INTEGER,
    //     onDelete: 'CASCADE',
    //     references: {
    //       model: 'orders',
    //       key: 'id'
    //     }
    //   },
    //   product_id: {
    //     allowNull: false,
    //     unique: false,
    //     type: Sequelize.INTEGER,
    //     onDelete: 'CASCADE',
    //     references: {
    //       model: 'products',
    //       key: 'id'
    //     }
    //   },
    //   quanty: { type: Sequelize.FLOAT },
    //   created_at: { type: Sequelize.DATE },
    //   updated_at: { type: Sequelize.DATE }
    // },

    //   {
    //     underscored: true,
    //     initialAutoIncrement: 1001, 
    //   })



  },

  ///Clients

  //res.id, res.name, price, quanty, subtotal, tax_id
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllTables()
  }
};



