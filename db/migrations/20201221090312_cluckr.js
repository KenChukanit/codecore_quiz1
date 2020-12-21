

exports.up = function(knex) {
    return knex.schema.createTable('clucks', table=>{
        table.increments('id');
        table.string('username');
        table.string('image_url');
        table.string('content');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('clucks');
  };
  