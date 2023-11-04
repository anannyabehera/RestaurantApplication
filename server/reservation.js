const { Router } = require('express');
const db = require('./model');
const util = require('util');
const router = Router();

router.post('/table', async (req, res) => {
  try {
    // Extract checkinDate and checkoutDate from the request body
    const { checkinDate, checkoutDate } = req.body;
console.log('server',req.body.checkinDate);
    // Execute the query to fetch reservations
    const query = `
      SELECT "noOfPeople", "tableName", "status", "clientName", "checkinDate", "checkoutDate"
      FROM "ReservationTable"
      WHERE "status" = 'v' AND "checkoutDate" <= $1 ORDER BY "noOfPeople" ASC
    `;

    const results = await db.query(query, [checkinDate]);
console.log('resultssssss',results);
    res.json(results.rows);
    // console.log(results.rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.post('/tableData', async (req, res) => {
  try {
    // Extract checkinDate and checkoutDate from the request body
    const { checkinDate, checkoutDate, tableName } = req.body;
console.log('server',req.body);
    // Execute the query to fetch reservations
    const query = `
    UPDATE "ReservationTable"
    SET    "clientName"='sample', "checkinDate"=$1, "checkoutDate"=$2, status='r'
    WHERE status='v' and "tableName"=$3;
    `;

    const results = await db.query(query, [checkinDate, checkoutDate, tableName]);

    // Send the results back to the client
    res.json(results.rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;
