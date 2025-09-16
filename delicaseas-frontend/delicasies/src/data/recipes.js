// src/data/recipes.js
import heroImg from "../assets/images/signup.jpg"; // Replace with actual images for each recipe

export const recipes = [
  {
    id: 1,
    title: "Spicy Thai Noodles",
    description: "A perfect balance of spice and flavor in every bite.",
    image: heroImg,
    time: "30 min",
    servings: "2 servings",
    category: "Lunch",
    ingredients: ["Rice noodles", "Soy sauce", "Chili flakes", "Garlic", "Vegetables"],
    steps: [
      "Boil the rice noodles until tender.",
      "Stir-fry garlic and vegetables in a pan.",
      "Add soy sauce and chili flakes.",
      "Mix in the noodles and toss well before serving."
    ]
  },
  {
    id: 2,
    title: "Grilled Salmon with Lemon",
    description: "Fresh salmon grilled to perfection with a hint of lemon.",
    image: heroImg,
    time: "25 min",
    servings: "2 servings",
    category: ["Dinner","Lunch"],
    ingredients: ["Salmon fillet", "Lemon slices", "Olive oil", "Salt", "Pepper"],
    steps: [
      "Season salmon with salt, pepper, and olive oil.",
      "Preheat grill to medium-high heat.",
      "Grill salmon for 6–8 minutes per side.",
      "Garnish with lemon slices and serve hot."
    ]
  },
  {
    id: 3,
    title: "Creamy Alfredo Pasta",
    description: "Rich and creamy pasta made with authentic Italian herbs.",
    image: heroImg,
    time: "40 min",
    servings: "3 servings",
    category: ["Dinner","Lunch"],
    ingredients: ["Fettuccine pasta", "Butter", "Heavy cream", "Parmesan cheese", "Garlic"],
    steps: [
      "Boil fettuccine pasta until al dente.",
      "In a pan, melt butter and sauté garlic.",
      "Add heavy cream and simmer for 5 minutes.",
      "Mix in Parmesan cheese until creamy.",
      "Combine with pasta and serve warm."
    ]
  },
  {
    id: 4,
    title: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with spiced chicken.",
    image: heroImg,
    time: "1 hr",
    servings: "4 servings",
    category: ["Dinner","Lunch"],
    ingredients: ["Basmati rice", "Chicken", "Yogurt", "Onions", "Spices"],
    steps: [
      "Marinate chicken in yogurt and spices for 1 hour.",
      "Fry onions until golden brown.",
      "Cook chicken until tender.",
      "Layer rice and chicken in a pot and steam for 20 minutes.",
      "Serve with raita."
    ]
  },
  {
    id: 5,
    title: "Classic Margherita Pizza",
    description: "Traditional Italian pizza topped with tomato, mozzarella, and basil.",
    image: heroImg,
    time: "30 min",
    servings: "2 servings",
    category: "Lunch",
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella cheese", "Basil leaves"],
    steps: [
      "Preheat oven to 220°C (425°F).",
      "Spread tomato sauce on rolled-out pizza dough.",
      "Top with mozzarella cheese and basil leaves.",
      "Bake for 12–15 minutes until crust is golden brown."
    ]
  },
  {
    id: 6,
    title: "Chocolate Lava Cake",
    description: "A gooey chocolate cake with a molten center.",
    image: heroImg,
    time: "35 min",
    servings: "2 servings",
    category: "Dessert",
    ingredients: ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour"],
    steps: [
      "Melt chocolate and butter together.",
      "Whisk eggs and sugar until fluffy.",
      "Fold in flour and chocolate mixture.",
      "Pour batter into ramekins and bake for 12 minutes.",
      "Serve warm with ice cream."
    ]
  },
  {
    id: 7,
    title: "Caesar Salad",
    description: "Crisp romaine lettuce with creamy Caesar dressing.",
    image: heroImg,
    time: "15 min",
    servings: "2 servings",
    category: "Lunch",
    ingredients: ["Romaine lettuce", "Parmesan cheese", "Croutons", "Caesar dressing"],
    steps: [
      "Chop romaine lettuce into bite-sized pieces.",
      "Toss with Caesar dressing.",
      "Top with croutons and Parmesan cheese.",
      "Serve chilled."
    ]
  },
  {
    id: 8,
    title: "Beef Tacos",
    description: "Spicy beef tacos topped with fresh salsa.",
    image: heroImg,
    time: "25 min",
    servings: "3 servings",
    category:["Dinner","Lunch"],
    ingredients: ["Ground beef", "Taco shells", "Cheese", "Tomato salsa", "Lettuce"],
    steps: [
      "Cook ground beef with spices until browned.",
      "Warm taco shells in a pan.",
      "Fill shells with beef, cheese, and lettuce.",
      "Top with tomato salsa and serve."
    ]
  },
  {
    id: 9,
    title: "Vegetable Stir-Fry",
    description: "Colorful veggies tossed in a savory soy sauce glaze.",
    image: heroImg,
    time: "20 min",
    servings: "2 servings",
    category: "Vegan",
    ingredients: ["Broccoli", "Carrots", "Bell peppers", "Soy sauce", "Garlic"],
    steps: [
      "Chop all vegetables into bite-sized pieces.",
      "Heat oil in a wok and sauté garlic.",
      "Add vegetables and stir-fry on high heat.",
      "Pour soy sauce and toss until veggies are tender-crisp."
    ]
  },
  {
    id: 10,
    title: "Pancakes with Maple Syrup",
    description: "Fluffy pancakes drizzled with sweet maple syrup.",
    image: heroImg,
    time: "20 min",
    servings: "3 servings",
    category: "Breakfast",
    ingredients: ["Flour", "Milk", "Eggs", "Sugar", "Maple syrup"],
    steps: [
      "Mix flour, milk, eggs, and sugar into a smooth batter.",
      "Heat a non-stick pan and pour batter.",
      "Flip when bubbles appear on the surface.",
      "Stack pancakes and drizzle with maple syrup."
    ]
  },
  {
    id: 11,
    title: "Garlic Butter Shrimp",
    description: "Juicy shrimp sautéed in garlic butter sauce.",
    image: heroImg,
    time: "15 min",
    servings: "2 servings",
    category: "Dinner",
    ingredients: ["Shrimp", "Garlic", "Butter", "Parsley", "Lemon juice"],
    steps: [
      "Melt butter in a pan and sauté garlic.",
      "Add shrimp and cook until pink.",
      "Drizzle lemon juice and garnish with parsley.",
      "Serve hot."
    ]
  },
  {
    id: 12,
    title: "Mango Smoothie",
    description: "Refreshing tropical smoothie with ripe mangoes.",
    image: heroImg,
    time: "10 min",
    servings: "2 servings",
    category: "Quick Bite",
    ingredients: ["Ripe mangoes", "Yogurt", "Honey", "Ice cubes"],
    steps: [
      "Peel and chop mangoes.",
      "Blend mangoes, yogurt, honey, and ice until smooth.",
      "Pour into glasses and serve chilled."
    ]
  },
  {
    id: 13,
    title: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with spiced chicken and herbs.",
    image: heroImg,
    time: "1 hr",
    servings: "4 servings",
    category: ["Dinner","Lunch"],
    ingredients: [
      "2 cups basmati rice",
      "500g chicken",
      "2 onions (sliced)",
      "2 tomatoes (chopped)",
      "1 cup yogurt",
      "Spices (turmeric, cumin, coriander, garam masala)",
      "Fresh coriander & mint leaves"
    ],
    steps: [
      "Marinate chicken with yogurt and spices.",
      "Cook onions and tomatoes until soft.",
      "Add chicken and cook until tender.",
      "Layer rice and chicken, then steam until done.",
      "Garnish with mint and coriander."
    ]
  },
  {
    id: 14,
    title: "Beef Tacos",
    description: "Mexican-style beef tacos with fresh toppings.",
    image: heroImg,
    time: "30 min",
    servings: "3 servings",
    category: "Dinner",
    ingredients: [
      "6 taco shells",
      "300g minced beef",
      "1 onion (chopped)",
      "2 tomatoes (diced)",
      "Lettuce (shredded)",
      "Cheddar cheese",
      "Taco seasoning"
    ],
    steps: [
      "Cook beef with onion and taco seasoning.",
      "Warm taco shells.",
      "Fill with beef, tomatoes, lettuce, and cheese.",
      "Serve with salsa or sour cream."
    ]
  },
  {
    id: 15,
    title: "Vegetable Stir Fry",
    description: "Quick and healthy stir-fried veggies with soy sauce.",
    image: heroImg,
    time: "20 min",
    servings: "2 servings",
    category: "Vegan",
    ingredients: [
      "1 cup broccoli florets",
      "1 bell pepper (sliced)",
      "1 carrot (julienned)",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "1 garlic clove (minced)"
    ],
    steps: [
      "Heat sesame oil in a wok.",
      "Add garlic and sauté.",
      "Add vegetables and stir-fry.",
      "Pour in soy sauce and toss.",
      "Serve hot with rice or noodles."
    ]
  },
  {
    id: 16,
    title: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and basil.",
    image: heroImg,
    time: "25 min",
    servings: "2 servings",
    category: "Lunch",
    ingredients: [
      "1 pizza base",
      "1/2 cup tomato sauce",
      "200g mozzarella",
      "Fresh basil leaves",
      "Olive oil"
    ],
    steps: [
      "Spread tomato sauce on pizza base.",
      "Top with mozzarella and basil.",
      "Bake at 220°C for 10–12 mins.",
      "Drizzle with olive oil and serve."
    ]
  },
  {
    id: 17,
    title: "Butter Chicken",
    description: "Creamy and flavorful Indian butter chicken curry.",
    image: heroImg,
    time: "50 min",
    servings: "4 servings",
    category: "Dinner",
    ingredients: [
      "500g chicken",
      "1 cup tomato puree",
      "1/2 cup cream",
      "2 tbsp butter",
      "Spices (garam masala, cumin, chili powder)"
    ],
    steps: [
      "Marinate chicken in yogurt and spices.",
      "Cook chicken until golden.",
      "Prepare curry with butter, tomato puree, and spices.",
      "Add cream and simmer.",
      "Serve with naan or rice."
    ]
  },
  {
    id: 18,
    title: "Caesar Salad",
    description: "Crisp romaine with creamy Caesar dressing.",
    image: heroImg,
    time: "15 min",
    servings: "2 servings",
    category: "Lunch",
    ingredients: [
      "Romaine lettuce",
      "Croutons",
      "Parmesan cheese",
      "Caesar dressing"
    ],
    steps: [
      "Chop romaine lettuce.",
      "Toss with dressing and croutons.",
      "Top with Parmesan cheese.",
      "Serve immediately."
    ]
  },
  {
    id: 19,
    title: "Chocolate Brownies",
    description: "Rich and fudgy chocolate brownies.",
    image: heroImg,
    time: "40 min",
    servings: "6 servings",
    category: "Dessert",
    ingredients: [
      "1/2 cup butter",
      "1 cup sugar",
      "2 eggs",
      "1/2 cup cocoa powder",
      "1/2 cup flour",
      "1 tsp vanilla extract"
    ],
    steps: [
      "Melt butter and mix with sugar.",
      "Add eggs and vanilla.",
      "Stir in cocoa and flour.",
      "Bake at 180°C for 25 mins.",
      "Cool and cut into squares."
    ]
  },
  {
    id: 20,
    title: "Shrimp Fried Rice",
    description: "Classic fried rice with shrimp and vegetables.",
    image: heroImg,
    time: "25 min",
    servings: "3 servings",
    category: "Dinner",
    ingredients: [
      "2 cups cooked rice",
      "200g shrimp",
      "1 cup mixed vegetables",
      "2 eggs (scrambled)",
      "2 tbsp soy sauce"
    ],
    steps: [
      "Cook shrimp until pink.",
      "Add vegetables and stir-fry.",
      "Add rice and soy sauce.",
      "Stir in scrambled eggs.",
      "Serve hot."
    ]
  },
  {
    id: 21,
    title: "Pancakes",
    description: "Fluffy homemade pancakes.",
    image: heroImg,
    time: "20 min",
    servings: "4 servings",
    category: "Breakfast",
    ingredients: [
      "1 cup flour",
      "2 tbsp sugar",
      "1 egg",
      "1 cup milk",
      "1 tsp baking powder"
    ],
    steps: [
      "Mix dry ingredients.",
      "Whisk in egg and milk.",
      "Pour batter on a hot griddle.",
      "Flip when bubbles appear.",
      "Serve with syrup."
    ]
  },
  {
    id: 22,
    title: "Greek Salad",
    description: "Refreshing salad with feta cheese and olives.",
    image: heroImg,
    time: "10 min",
    servings: "2 servings",
    category: ["Lunch, Vegan"],
    ingredients: [
      "Cucumber",
      "Tomatoes",
      "Red onion",
      "Olives",
      "Feta cheese",
      "Olive oil & oregano"
    ],
    steps: [
      "Chop all vegetables.",
      "Mix with olives and feta.",
      "Drizzle with olive oil.",
      "Sprinkle oregano and serve."
    ]
  },
  {
    id: 23,
    title: "Beef Burger",
    description: "Juicy homemade beef patty in a bun.",
    image: heroImg,
    time: "30 min",
    servings: "2 servings",
    category: "Quick Bite",
    ingredients: [
      "2 burger buns",
      "250g beef mince",
      "Lettuce",
      "Tomato",
      "Cheese slice",
      "Onion",
      "Ketchup & mayo"
    ],
    steps: [
      "Shape beef mince into patties.",
      "Grill patties until cooked.",
      "Toast buns lightly.",
      "Assemble with toppings and sauce.",
      "Serve hot."
    ]
  },
  {
    id: 24,
    title: "Mango Smoothie",
    description: "Refreshing tropical mango smoothie.",
    image: heroImg,
    time: "5 min",
    servings: "2 servings",
    category: "Quick Bite",
    ingredients: [
      "1 ripe mango",
      "1 cup milk",
      "1 tbsp honey",
      "Ice cubes"
    ],
    steps: [
      "Peel and chop mango.",
      "Blend with milk, honey, and ice.",
      "Serve chilled."
    ]
  }
];
