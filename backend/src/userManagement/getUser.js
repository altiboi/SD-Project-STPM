const { app } = require('@azure/functions');
const { MongoClient } = require("mongodb");
const client = MongoClient(process.env.COSMOSDB_URI);


app.http('getUser', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const { email } = request.query;

        try{
            const db = await client.db(process.env.COSMOSDB_DATABASE);
            const users = db.collection("Users");
            const user = await users.findOne({ Email: email });
    
            if (user) {
            context.res = {
                "headers":{
                    "content-type": "application/json"
                },
                "body": {
                    "Role": user.Role,
                    "Name": user.Name,
                    "Email": email,
                    "Phone": user.Phone,
                    "PropertyName": user.PropertyName,
                    "UnitID": user.UnitID,
                    "onPremises": user.onPremises
                }
            }
            } else {
            res.status(404).json({ error: 'User not found' });
            context.res = {
                "status": 404,
                "headers": {
                    "content-type": "application/json"
                },
                "body": {
                    "message": "User not found"
                }
            }
            }
        } catch (error){
            context.res = {
                "status": 500,
                "headers": {
                    "content-type": "application/json"
                },
                "body": {
                    "message": error.toString()
                }
            }
        }
    }
});
