// seed.ts

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create a user named "bob"
    const bob = await prisma.user.create({
      data: {
        email: 'bob@example.com', // Set the email for "bob"
        name: 'Bob', // Set the name for "bob"
        role: 'USER', // Set the role for "bob" (assuming USER is a valid role)
      },
    });

    // Insert the example review data into the database
    await prisma.reviews.create({
      data: {
        title: 'Example Review', // Set the title of the review
        userId: bob.id, // Set the userId to the id of "bob"
        reviewText: 'This is an example review.', // Set the review text
      },
    });

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}

seed(); // Call the seed function

