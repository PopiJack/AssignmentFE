Took 2 FE and 2 hours BE
WIth more time i would implement MVC structure for better readibility.
1. **Concurrency:** 
What could go wrong if two "Add Stamp" requests arrive at the exact same moment? How would you prevent it?
Could update the current count two times.

3. **Production:** Your backend uses in-memory storage. Why is this a problem when you deploy to production, and what would you use instead?
It's a problem because the data after the service end are lost.
I would use DB.