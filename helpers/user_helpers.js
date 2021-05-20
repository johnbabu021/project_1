const db = require('../config/connection');
const collection = require('../config/collection');
const { response } = require('../app');

const bcrypt = require('bcrypt')


module.exports = {

    doLogin: (userData) => {
        console.log(userData);
        return new Promise(async (resolve, reject) => {
            let response = function () { }
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ mail: userData.mail })
            console.log(user);
            if (user) {
                console.log('user is here' + user);

                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        console.log('success');
                        response.status = true;
                        response.user = user
                        resolve((response))
                    }
                    else {
                        console.log('login failed')
                        resolve({ status: false })
                    }
                })
            }
            else {
                console.log('login failed');
                resolve({ status: false })
            }
        })

    },
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10);
            userData.cpassword = await bcrypt.hash(userData.cpassword, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((response) => {

                resolve(response.ops[0])
            })

        })
    },
    ambulanceHelper: (ambulanceDetails) => {
        return new Promise((resolve, reject) => {

            db.get().collection(collection.AMBULANCE_COLLECTION).insertOne(ambulanceDetails).then((response) => {
                resolve(response)
            })

        })

    },
    hospitalHelper: (hospitalDetails) => {
        return new Promise((resolve, reject) => {

            db.get().collection(collection.HOSPITAL_COLLECTION).insertOne(hospitalDetails).then((response) => {
                resolve(response)
            })

        })

    },
    taxiHelper: (taxiDetails) => {
        return new Promise((resolve, reject) => {

            db.get().collection(collection.TAXI_COLLECTION).insertOne(taxiDetails).then((response) => {
                resolve(response)
            })

        })

    },
    doctor: (doctorDetails) => {
        return new Promise((resolve, reject) => {

            db.get().collection(collection.DOCTOR_COLLECTION).insertOne(doctorDetails).then((response) => {
                resolve(response)
            })

        })

    },
    findAllTaxis: () => {

        return new Promise(async (resolve, reject) => {

            let taxi = await db.get().collection(collection.TAXI_COLLECTION).find().toArray();
            resolve(taxi)

        })

    },

    findAllHospitals: () => {

        return new Promise(async (resolve, reject) => {

            let hospital = await db.get().collection(collection.HOSPITAL_COLLECTION).find().toArray();
            resolve(hospital)

        })

    },
    findAllAmbulances: () => {

        return new Promise(async (resolve, reject) => {

            let ambulance = await db.get().collection(collection.AMBULANCE_COLLECTION).find().toArray();
            resolve(ambulance)

        })

    },

    findAllDoctors: () => {

        return new Promise(async (resolve, reject) => {

            let doctor = await db.get().collection(collection.DOCTOR_COLLECTION).find().toArray();
            resolve(doctor)

        })

    }



}