const express = require('express');
const { allowAcess } = require('../middlewares/security.middleware');
const users = require('../modals/userSchema')
const router = express.Router();

// router.use()

//Posting data
router.post('/form', async (req, res) => {
    const { name, email, age, mobile, address, work, desc } = req.body

    if (!name || !email || !age || !mobile || !address || !work || !desc) {
        res.status(404).send("Please enter all require fields")
    }

    try {
        const preUser = await users.findOne({ email: email });

        if (preUser) {
            res.status(404).send("This user is already exists")
        } else {
            const addUser = new users({
                name, email, age, mobile, address, work, desc
            })

            await addUser.save()

            res.status(201).send(addUser)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

//Getting data

router.get('/', allowAcess, async (req, res) => {
    try {
        const getUser = await users.find({})
        res.status(200).json(getUser)
    } catch (error) {
        res.status(404).json(error)
        console.log("43",error)
    }
})

// Get Individual Data

router.get("/view/:id", async (req, res) => {
    try {
        const { id } = req.params
        const getIndividualData = await users.findById({ _id: id })
        console.log(getIndividualData)
        res.status(201).json(getIndividualData)

    } catch (error) {
        res.status(404).json(error)
    }
})

//Updating Route
router.put("/Edit/:id", async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const updateValue = await users.findByIdAndUpdate(id, req.body, {
            new: true
        })

        res.status(201).json(updateValue)
    } catch (error) {
        res.status(404).json(error)
    }
})


//Delete Id

router.delete("/deleteUser/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteUser = await users.findByIdAndDelete({ _id: id })
        res.status(201).json(deleteUser)
    } catch (error) {
        res.status(404).json(error)
    }
})

//Search Api

router.get('/search/:key', async (req, res) => {
    try {
        let data = await users.find(
            {
                "$or": [
                    { "name": { $regex: req.params.key } },
                    { "email": { $regex: req.params.key } },
                    { "address": { $regex: req.params.key } },
                ]
            }
        )

        res.status(201).json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }

})

//Sorting Route for Home page from Z to A

router.get('/sort', async (req, res) => {
    try {
        let SortedDataZA = await users.find({}).sort({ name: -1 })
        res.status(200).json(SortedDataZA)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/filter', async (req, res) => {
    try {
        let filteredData = await users.find().populate('age')
        res.status(200).json(filteredData)
    } catch (error) {
        res.status(404).send(error)
    }
})
module.exports = router;