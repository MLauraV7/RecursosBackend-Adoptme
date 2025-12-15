import { Router } from "express";
import { generateMockUsers } from "../utils/mockingUsers.js";
import { usersService, petsService } from "../services/index.js";
import bcrypt from "bcrypt";

const router = Router();

router.get('/mockingusers', async (req, res) => {
  const users = await generateMockUsers(50);
  res.send({ status: "success", payload: users });
});

router.post('/generateData', async (req, res) => {
  const { users, pets } = req.body;

  try {
    const createdUsers = [];

    // USERS
    for (let i = 0; i < users; i++) {
      const hashedPassword = await bcrypt.hash("coder123", 10);

      const user = await usersService.create({
        first_name: `User${i}`,
        last_name: "Generated",
        email: `generated${i}@mail.com`,
        password: hashedPassword,
        role: Math.random() > 0.5 ? "user" : "admin",
        pets: []
      });

      createdUsers.push(user);
    }

    // PETS
    for (let i = 0; i < pets; i++) {
      const owner = createdUsers[Math.floor(Math.random() * createdUsers.length)];

      const pet = await petsService.create({
        name: `Pet${i}`,
        specie: "dog",
        adopted: false,
        owner: owner._id
      });

      // asociar mascota al usuario
      owner.pets.push(pet._id);
      await usersService.update(owner._id, { pets: owner.pets });
    }

    res.send({
      status: "success",
      message: "Users and pets generated successfully"
    });

  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message
    });
  }
});

router.get('/mockingpets', async (req, res) => {
  const pets = [];

  for (let i = 0; i < 100; i++) {
    pets.push({
      _id: `mock_pet_${i}`,
      name: `Pet${i}`,
      specie: "dog",
      adopted: false
    });
  }

  res.send({ status: "success", payload: pets });
});

export default router;