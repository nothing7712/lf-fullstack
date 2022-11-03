const express = require('express')
// TODO: use a better validation library
const validator = require('everything-validator')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = new express()
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json())
app.use(function (_req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

// TODO: pull this data from a database instead
const MANAGER_DATA_SOURCE = 'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers'

app.get('/api/supervisors', async (_req, res, next) => {
    try {
        const response = await axios.get(MANAGER_DATA_SOURCE)
        data = response.data.map(manager => {
            let result = !validator.isDigits(manager.jurisdiction) ? `${manager.jurisdiction} - ` : ''
            return result + `${manager.lastName}, ${manager.firstName}`
        })
        data.sort()
        res.json(data)
    } catch (error) {
        next(error)
    }
})

// NOTE: I'm assuming that phoneNumber and email are optional
app.post('/api/submit', async (req, res) => {
    const person = req.body

    if (!person.firstName) {
        res.json({
            'error': 'First name is required.'
        })
        return
    }

    if (!person.lastName) {
        res.json({
            'error': 'Last name is required.'
        })
        return
    }

    if (!validator.isLetters(person.firstName) || !validator.isLetters(person.lastName)) {
        res.json({
            'error': 'First and last name can only contain letters.'
        })
        return
    }

    if (!person.Supervisor) {
        res.json({
            'error': 'Supervisor is required.'
        })
        return
    }

    if (person.email && !validator.isEmail(person.email)) {
        res.json({
            'error': 'Please enter a valid email address.'
        })
        return
    }

    if (person.phoneNumber && !validator.isPhoneNumber(person.phoneNumber)) {
        res.json({
            'error': 'Please enter a valid phone number.'
        })
        return
    }

    console.log(person)
    res.sendStatus(200)
})

app.listen(8090, () => {
    console.log('API listening on 8090')
})
