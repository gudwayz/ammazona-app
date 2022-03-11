import bcrypt from 'bcrypt'


export const data = {
    users: [
        { name: 'uzoma', email: 'uzomski@gmail.com', password: bcrypt.hashSync('1234', 8), isAdmin: true },
        { name: 'vivian', email: 'viviski@gmail.com', password: bcrypt.hashSync('1234', 8), isAdmin: true }
    ],
    products: [{
            name: 'Nike slirk',
            category: 'shirt',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 15,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality products'
        }, {
            name: 'Adidas slirk',
            category: 'Shirt',
            image: '/images/p2.jpg',
            price: 100,
            countInStock: 20,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 14,
            description: 'high quality products'
        },
        {
            name: 'Puma slirk',
            category: 'Shirt',
            image: '/images/p3.jpg',
            price: 200,
            countInStock: 35,
            brand: 'Puma',
            rating: 5.0,
            numReviews: 50,
            description: 'high quality products'
        },

        {
            name: 'Nike pants',
            category: 'Pants',
            image: '/images/p4.jpg',
            price: 170,
            brand: 'Nike',
            countInStock: 0,
            rating: 4.0,
            numReviews: 30,
            description: 'high quality products'
        },

        {
            name: 'puma joggers',
            category: 'Joggers',
            image: '/images/p5.jpg',
            price: 190,
            countInStock: 24,
            brand: 'Puma',
            rating: 5.0,
            numReviews: 45,
            description: 'high quality products'
        },

        {
            name: 'Adidas Joggers',
            category: 'Joggers',
            image: '/images/p6.jpg',
            price: 500,
            countInStock: 15,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality products'
        }
    ]
}