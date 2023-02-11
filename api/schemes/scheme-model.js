const db = require('../../data/db-config')

async function find() { // EXERCISE A
  const rows = await db('schemes as s')
    .leftJoin('steps as st', 'st.scheme_id', '=', 's.scheme_id')
    .count('st.scheme_id as number_of_steps')
    .groupBy('scheme_name')
    .orderBy('s.scheme_id', 'asc')
    .select('s.scheme_id', 's.scheme_name')
  return rows
}

async function findById(scheme_id) { // EXERCISE B
  const rows = await db('schemes as sc')
    .leftJoin('steps as st', 'st.scheme_id', '=', 'sc.scheme_id')
    .orderBy('st.step_number', 'asc')
    .where('sc.scheme_id', scheme_id)
    .select(
      'sc.scheme_id',
      'sc.scheme_name',
      'st.step_id',
      'st.step_number',
      'st.instructions'
    )

  const steps = []
  if (rows[0].step_id){
  rows.forEach((row) => {
    steps.push( {
      step_id: row.step_id,
      step_number: row.step_number,
      instructions: row.instructions
    })
  })}

  const result = {
    scheme_id: parseInt(scheme_id),
    scheme_name: rows[0].scheme_name,
    steps: steps || []
  }
  return result
}
  /*
    select
    scheme_id,
    scheme_name,
    step_id,
    step_number,
    instructions
    from schemes as sc
    left join steps as st
    on st.scheme_id = sc.scheme_id
    where sc.scheme_id = 2
    order by st.step_number;
  */


function findSteps(scheme_id) { // EXERCISE C
  const rows = db('steps as st')
    .leftJoin('schemes as sc', 'st.scheme_id', '=', 'sc.scheme_id')
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number', 'asc')
    .select('step_id', 'scheme_name', 'step_number', 'instructions')

  return rows
  /*

  select
    step_id,
    scheme_name,
    step_number,
    instructions
from schemes as sc
left join steps as st
on st.scheme_id = sc.scheme_id
where sc.scheme_id = 2
order by step_number;
  */
}

async function add(scheme) { // EXERCISE D
  console.log(scheme)
  await db('schemes')
  .insert(scheme)

  const newScheme = await db('schemes')
    .where('scheme_name', scheme.scheme_name)
    .first()
  return newScheme
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
