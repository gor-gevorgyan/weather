const weatherHelper = require('../classes/open-weather-api');
const {User, History} = require('../models');

class Weather {
    static async getByCityName(request, reply) {
        //create new line for IP or get
        let user = await User.findOrCreate({
            where: {
                ip: request.ip
            },
            include: [
                {
                    model: History,
                    as: 'userHistory',
                }
            ],
            order: [["userHistory", 'id', 'desc']]
        });

        let userData = user[0];

         let weatherAPI = new weatherHelper();
         let city_exists = true;
         let city_data = [];

         try {
             //get data from API
             let data = await weatherAPI.get({
                 q: request.params.cityname,
                 units: "metric"
             });

             city_data = data.data;

             //store API darta
             await History.create({
                 userId: userData.id,
                 data: JSON.stringify(city_data)
             });
         } catch (e) {
             city_exists = false;
         }

        return reply.view('city', {
            city_exists,
            city_data,
            city_name: request.params.cityname,
            history: userData.userHistory
        });
    }
}

module.exports = Weather;