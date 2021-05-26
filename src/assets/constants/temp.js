export const months = {
	0: {
		name: 'enero'
	},
	1: {
		name: 'febrero'
	},
	2: {
		name: 'marzo'
	},
	3: {
		name: 'abril'
	},
	4: {
		name: 'mayo'
	},
	5: {
		name: 'junio'
	},
	6: {
		name: 'julio'
	},
	7: {
		name: 'agosto'
	},
	8: {
		name: 'septiembre'
	},
	9: {
		name: 'octubre'
	},
	10: {
		name: 'noviembre'
	},
	11: {
		name: 'diciembre'
	},
}

export let restaurants = [
	{
		id: 1,
		name: 'Hacienda Real',
		uri: 'http://www.haciendareal.net/gt/wp-content/uploads/slideshow-satellite/ga5.jpg',
		time: 30,
		score: 4.7,
		tags: [14],
	},
	{
		id: 2,
		name: 'Frisco Grill',
		uri: 'https://www.guatemala.com/fotos/201706/Frisco-Grill1-885x500.jpg',
		time: 25,
		score: 4.8,
		tags: [3],
		menu: [
			{
				category: 'Cocteles',
				items: [
					{
						name: 'Piña Colada',
						description: 'coctel preparado con crema de coco, piña y un toque de Ron Bacardí',
						category: 'Cocteles',
						price: 'Q25',
						uri: 'https://images.absolutdrinks.com/drink-images/Raw/Absolut/d32f1cf1-2a28-463b-9b64-26be5eaf75ed.jpg?imwidth=500',
						qty: 0
					},
					{
						name: 'White Sangría',
						description: 'vino blanco, licor de sabor con frutas de la estación y un toque de cítricos',
						category: 'Cocteles',
						price: 'Q35',
						uri: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/05/White-Sangria-12-500x500.jpg',
						qty: 0
					},
					{
						name: 'Mojito',
						description: 'el clásico coctel cubano con Ron Botrán y hierbabuena',
						category: 'Cocteles',
						price: 'Q35',
						uri: 'https://www.hola.com/imagenes/cocina/recetas/20191213156214/mojito-coctel-clasico/0-758-693/mojito-m.jpg',
						qty: 0
					},
					{
						name: 'Margarita',
						description: 'a base de tequila Jose Cuervo Reposado, preparado con el sabor limón',
						category: 'Cocteles',
						price: 'Q25',
						uri: 'https://www.splenda.com/wp-content/themes/bistrotheme/assets/recipe-images/margarita.jpg',
						qty: 0
					},
				]
			},
			{
				category: 'Combos',
				items: [
					{
						name: 'The Classic',
						description: '8 alitas (boneless o clásicas) + 1 pichel de cerveza',
						category: 'Combos',
						price: 'Q135',
						uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwIph7boApxAZhwmYbXjhKrwU06fZrXZzlNg&usqp=CAU',
						qty: 0
					},
				]
			},
			{
				category: 'Wings',
				items: [
					{
						name: 'The Classics',
						description: 'nuestras clásicas alitas de pollo marinadas',
						category: 'Wings',
						price: 'Q85',
						uri: 'https://hips.hearstapps.com/hmg-prod/images/classic-buffalo-wings-horizontal-279-1547506077.jpg',
						qty: 0
					},
					{
						name: 'Bonelesss Wings',
						description: 'trozos de pechuga de pollo marinados',
						category: 'Wings',
						price: 'Q85',
						uri: 'https://www.macheesmo.com/wp-content/uploads/2017/01/Real-Boneless-Wings-Featire.jpg',
						qty: 0
					}
				]
			},
			{
				category: 'Hamburguesas',
				items: [
					{
						name: "Chofo's Texas Ranger Burger",
						description: 'tocino ahumado , aros de cebolla, queso monterrey jack, jalapeño y chili beans',
						category: 'Hamburguesas',
						price: 'Q89',
						uri: 'https://scontent.fgua2-1.fna.fbcdn.net/v/t1.6435-9/188009106_10158441941927956_3258260710815785700_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=730e14&_nc_ohc=oXr6YfP8s0AAX95sK0d&_nc_oc=AQmnnmVPU9QJurXwXrNPWwy1I2NNxndZaR4_JcLA0e_YufEcW2vSV7d3tMCvF7kiz9fATjVgqEHB6mBsFv9qsVcA&_nc_ht=scontent.fgua2-1.fna&oh=7f8d28c43c157c219002f70f2dab54f1&oe=60D273EF',
						qty: 0
					},
					{
						name: 'Tortrix Onion Cheese Burger',
						description: 'tortrix, queso provolone, cebollas caramelizadas y tocino con nuestra salsa original BBQ',
						category: 'Hamburguesas',
						price: 'Q89',
						uri: 'https://pbs.twimg.com/media/DBG0x-aV0AAo3tN.jpg',
						qty: 0
					},
					{
						name: "Rolls Royce",
						description: 'Original de la casa, bañada con salsa bearnesa y champiñones',
						category: 'Hamburguesas',
						price: 'Q77',
						uri: 'https://scontent.fgua2-1.fna.fbcdn.net/v/t31.18172-8/s1080x2048/29982907_10155615725862956_1622570328771252383_o.jpg?_nc_cat=107&ccb=1-3&_nc_sid=730e14&_nc_ohc=2KXbUy4nkbcAX_Axl7-&_nc_ht=scontent.fgua2-1.fna&tp=7&oh=b4893271de33074adec059516ac84f44&oe=60D5FA3D',
						qty: 0
					}
				]
			}
		]
	},
	{
		id: 3,
		name: 'La Cantina',
		uri: 'https://www.guatemala.com/fotos/201706/La-Cantina-5E4-885x500.jpg',
		time: 20,
		score: 4.3,
		tags: [6],
	},
	{
		id: 4,
		name: 'Saúl',
		uri: 'https://www.guatemala.com/fotos/201709/Saul-La-Sexta1-1-885x500.jpg',
		time: 30,
		score: 4.7,
		tags: [8],
	},
	{
		id: 5,
		name: 'Cielito Lindo',
		uri: 'https://s3-us-west-2.amazonaws.com/minisitios/revistaamigapl/wp-content/uploads/2016/08/cielito-lindo.jpg',
		time: 25,
		score: 4.5,
		tags: [6],
	},
	{
		id: 6,
		name: 'El Camioncito',
		uri: 'https://www.guatemala.com/fotos/2020/09/Restaurantes-con-servicio-a-domicilio-en-Guatemala21-885x500.jpg',
		time: 35,
		score: 4.1,
		tags: [6],
	},
	{
		id: 7,
		name: 'El Pinche',
		uri: 'https://www.empleosguate.com/wp-content/uploads/2017/08/el-pinche-empleos.jpg',
		time: 30,
		score: 4.4,
		tags: [6],
	},
	{
		id: 8,
		name: `Friday's`,
		uri: 'https://www.hospitalityandcateringnews.com/wp-content/uploads/2015/12/TGI-Fridays-opens-flagship-restaurant2.jpg',
		time: 30,
		score: 4.4,
		tags: [3],
	},
	{
		id: 9,
		name: 'Skillets',
		uri: 'https://directorio.guatemala.com/custom/domain_1/image_files/sitemgr_photo_1140.jpg',
		time: 30,
		score: 4.4,
		tags: [3],
	},
]

export const tags = [
    {
        id: 3,
        title: 'Hamburguesas',
        uri: 'https://media.istockphoto.com/photos/closeup-of-delicious-fresh-home-made-burger-with-lettuce-cheese-onion-picture-id947086140?k=6&m=947086140&s=612x612&w=0&h=30HfZpFZNgLCnx2hHI_oO9-c0_Z4kGIcYZKiJvswXpM=',
    },
    {
        id: 1,
        title: 'Pizza',
        uri: 'https://ichef.bbci.co.uk/food/ic/food_16x9_448/recipes/alpine_pizza_32132_16x9.jpg',
    },
	{
        id: 14,
        title: 'Steak',
        uri: 'https://www.lovebeverlyhills.com/uploads/cache/Image/BlockFeaturedBlock/id/2731/778fd1da0d54d0702ab089f69d0f2d21fac5a3f5.jpg',
    },
    {
		id: 6,
        title: 'Mexican Style',
        uri: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/04/Carnitas-Tacos-3.jpg',
    },
	{
		id: 4,
		title: 'Italiano',
		uri: 'https://thestayathomechef.com/wp-content/uploads/2017/12/Pasta-Pomodoro-4-small.jpg',
	},
    {
        id: 8,
        title: 'Saludable',
        uri: 'https://foodwithfeeling.com/wp-content/uploads/2016/05/Southwestern-Inspired-Quinoa-Bowl-6.jpg',
    },
    {
        id: 7,
        title: 'Postres',
        uri: 'https://www.justataste.com/wp-content/uploads/2020/05/strawberry-pretzel-dessert-cups-recipe.jpg',
    },
    {
        id: 12,
        title: 'Pollo',
        uri: 'https://img.aws.livestrongcdn.com/ls-article-image-673/ds-photo/getty/article/225/47/470657766.jpg',
    },
    {
        id: 11,
        title: 'Sushi',
        uri: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https://static.onecms.io/wp-content/uploads/sites/9/2013/12/06/201103-xl-sushi-rolls.jpg',
    },
    {
        id: 10,
        title: 'Oriental',
        uri: 'https://recipefairy.com/wp-content/uploads/2020/06/panda-express-orange-chicken.jpg',
    },
    {
        id: 13,
        title: 'American Style',
        uri: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2003/10/16/0/tm1b67_philly_steak_sandwich.jpg.rend.hgtvcom.616.462.jpeg',
    },
    {
        id: 15,
        title: 'Drinks',
        uri: 'https://beekmanbeergarden.com/wp-content/uploads/2017/10/drinks.jpg',
    },
];