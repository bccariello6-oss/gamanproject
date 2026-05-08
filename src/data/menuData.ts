import { MenuData } from '../types';

export const MENU_DATA: MenuData = {
  categories: [
    { id: "entradas",   label: "Entradas",          kanji: "前菜" },
    { id: "sushi",      label: "Sushi",              kanji: "寿司" },
    { id: "sashimi",    label: "Sashimi",            kanji: "刺身" },
    { id: "gunkans",    label: "Gunkans",            kanji: "軍艦" },
    { id: "makimonos",  label: "Makimonos",          kanji: "巻物" },
    { id: "harumakis",  label: "Harumakis",          kanji: "春巻き" },
    { id: "temakis",    label: "Temakis",            kanji: "手巻き" },
    { id: "robatas",    label: "Robatas",            kanji: "炉端" },
    { id: "tempuras",   label: "Tempurás",           kanji: "天ぷら" },
    { id: "especiais",  label: "Especiais do Chef",  kanji: "特製" },
    { id: "sobremesas", label: "Sobremesas",         kanji: "甘味" }
  ],

  items: [
    // ENTRADAS
    {
      id: "e01", category: "entradas",
      name: "Carpaccio de Salmão",
      description: "Finos cortes de salmão fresco ao molho ponzu do chef com crispy de alho poró.",
      composition: ["Salmão fresco", "Molho ponzu artesanal", "Crispy de alho poró", "Azeite trufado"],
      price: 42.00, serves: "1 pessoa", units: null,
      tags: ["chef", "sem glúten"],
      image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80"
    },
    {
      id: "e02", category: "entradas",
      name: "Sunomono",
      description: "Salada de pepino japonês no molho agridoce com gergelim torrado.",
      composition: ["Pepino japonês", "Vinagre de arroz", "Gergelim torrado", "Missô"],
      price: 26.00, serves: "1 pessoa", units: null,
      tags: ["vegano", "sem glúten"],
      image: "https://images.unsplash.com/photo-1648508596927-27768a5cf0a4?w=600&q=80"
    },
    {
      id: "e03", category: "entradas",
      name: "Ceviche de Peixe Branco",
      description: "Cubos de peixe branco curado no limão com especiarias da casa.",
      composition: ["Peixe branco", "Limão siciliano", "Coentro", "Pimenta dedo-de-moça"],
      price: 38.00, serves: "1 pessoa", units: null,
      tags: ["sem glúten", "fresco"],
      image: "https://images.unsplash.com/photo-1535400255456-984e7a4e3d8f?w=600&q=80"
    },

    // SUSHI
    {
      id: "s01", category: "sushi",
      name: "Sushi Salmão",
      description: "Nigiri clássico com corte nobre de salmão fresco sobre arroz temperado.",
      composition: ["Salmão fresco", "Arroz japonês", "Wasabi", "Shoyu"],
      price: 9.00, serves: null, units: "1 unid.",
      tags: [],
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80"
    },
    {
      id: "s02", category: "sushi",
      name: "Sushi Salmão Maçaricado",
      description: "Nigiri com salmão flambado na hora, cream cheese e cebolinha.",
      composition: ["Salmão", "Cream cheese", "Cebolinha", "Arroz japonês"],
      price: 11.00, serves: null, units: "1 unid.",
      tags: ["popular"],
      image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80"
    },
    {
      id: "s03", category: "sushi",
      name: "Sushi Atum",
      description: "Nigiri com atum bluefin importado, textura delicada e sabor profundo.",
      composition: ["Atum bluefin", "Arroz japonês", "Wasabi"],
      price: 12.00, serves: null, units: "1 unid.",
      tags: ["premium"],
      image: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=80"
    },

    // SASHIMI
    {
      id: "sa01", category: "sashimi",
      name: "Sashimi de Salmão",
      description: "5 cortes de salmão atlântico premium, servidos com gengibre e wasabi.",
      composition: ["Salmão atlântico", "Gengibre conserva", "Wasabi", "Shoyu premium"],
      price: 36.00, serves: null, units: "5 cortes",
      tags: ["sem glúten"],
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80"
    },
    {
      id: "sa02", category: "sashimi",
      name: "Sashimi de Peixe Branco Toast Trufado",
      description: "5 cortes de peixe branco maçaricados no azeite trufado — especialidade da casa.",
      composition: ["Peixe branco", "Azeite trufado", "Flor de sal", "Limão siciliano"],
      price: 44.00, serves: null, units: "5 cortes",
      tags: ["chef", "premium"],
      image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=600&q=80"
    },
    {
      id: "sa03", category: "sashimi",
      name: "Sashimi de Atum",
      description: "5 cortes de atum fresco, servidos com shoyu especial.",
      composition: ["Atum fresco", "Shoyu", "Wasabi", "Gengibre"],
      price: 48.00, serves: null, units: "5 cortes",
      tags: ["premium"],
      image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80"
    },

    // GUNKANS
    {
      id: "g01", category: "gunkans",
      name: "Gunkan Gaman",
      description: "Carro-chefe da casa. Salmão flambado, cream cheese, geleia de pimenta, queijo coalho crocante e hortelã.",
      composition: ["Salmão flambado", "Cream cheese", "Geleia de pimenta", "Queijo coalho", "Hortelã", "Alga nori"],
      price: 54.00, serves: null, units: "5 unid.",
      tags: ["chef", "popular", "picante"],
      image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80"
    },
    {
      id: "g02", category: "gunkans",
      name: "Gunkan Palmito Roll",
      description: "Salmão flambado com palmito, cream cheese e molho teriaki.",
      composition: ["Salmão flambado", "Palmito", "Cream cheese", "Teriaki", "Alga nori"],
      price: 44.00, serves: null, units: "5 unid.",
      tags: ["popular"],
      image: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=80"
    },
    {
      id: "g03", category: "gunkans",
      name: "Gunkan Salmão Maracujá",
      description: "Salmão flambado com cream cheese e geleia de maracujá — equilíbrio ácido e cremoso.",
      composition: ["Salmão flambado", "Cream cheese", "Geleia de maracujá", "Alga nori"],
      price: 44.00, serves: null, units: "5 unid.",
      tags: [],
      image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80"
    },

    // HARUMAKIS
    {
      id: "h01", category: "harumakis",
      name: "Harumaki de Camarão",
      description: "Massa artesanal crocante recheada com camarão temperado.",
      composition: ["Massa artesanal", "Camarão", "Temperos da casa"],
      price: 28.00, serves: null, units: "2 unid.",
      tags: [],
      image: "https://images.unsplash.com/photo-1617196034738-26c5f7c977ce?w=600&q=80"
    },
    {
      id: "h02", category: "harumakis",
      name: "Harumaki de Frango",
      description: "Massa crocante recheada com frango desfiado ao molho da casa.",
      composition: ["Massa artesanal", "Frango desfiado", "Molho especial"],
      price: 24.00, serves: null, units: "2 unid.",
      tags: [],
      image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&q=80"
    },

    // TEMAKIS
    {
      id: "t01", category: "temakis",
      name: "Temaki Salmão",
      description: "Cone de alga nori recheado com salmão, cream cheese e cebolinha.",
      composition: ["Alga nori", "Salmão", "Cream cheese", "Cebolinha", "Arroz japonês"],
      price: 28.00, serves: "1 pessoa", units: null,
      tags: ["popular"],
      image: "https://images.unsplash.com/photo-1617196035154-a9e9d5ab9e76?w=600&q=80"
    },
    {
      id: "t02", category: "temakis",
      name: "Temaki Philadelphia",
      description: "Cone com salmão, cream cheese e pepino japonês.",
      composition: ["Salmão", "Cream cheese", "Pepino japonês", "Gergelim", "Alga nori"],
      price: 26.00, serves: "1 pessoa", units: null,
      tags: [],
      image: "https://images.unsplash.com/photo-1617196035154-a9e9d5ab9e76?w=600&q=80"
    },

    // ROBATAS
    {
      id: "r01", category: "robatas",
      name: "Robata de Camarão — 10 unid.",
      description: "Espetinhos de camarão grelhados na brasa com molho especial.",
      composition: ["Camarão", "Molho teriaki", "Limão", "Ervas finas"],
      price: 52.00, serves: "1-2 pessoas", units: "10 unid.",
      tags: ["sem glúten"],
      image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80"
    },
    {
      id: "r02", category: "robatas",
      name: "Robata de Lula — 10 unid.",
      description: "Espetinhos de lula grelhados com toque de gengibre e limão.",
      composition: ["Lula", "Gengibre", "Limão", "Molho ponzu"],
      price: 48.00, serves: "1-2 pessoas", units: "10 unid.",
      tags: ["sem glúten"],
      image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=600&q=80"
    },

    // TEMPURÁS
    {
      id: "tp01", category: "tempuras",
      name: "Tempurá de Peixe Branco — 10 unid.",
      description: "Peixe branco empanado em massa leve e crocante, frito na hora.",
      composition: ["Peixe branco", "Massa tempurá", "Azeite de gergelim", "Shoyu tentsuyu"],
      price: 46.00, serves: "1-2 pessoas", units: "10 unid.",
      tags: [],
      image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&q=80"
    },
    {
      id: "tp02", category: "tempuras",
      name: "Tempurá de Camarão — 10 unid.",
      description: "Camarão em massa tempurá crocante com molho tentsuyu.",
      composition: ["Camarão", "Massa tempurá", "Molho tentsuyu", "Daikon ralado"],
      price: 52.00, serves: "1-2 pessoas", units: "10 unid.",
      tags: ["popular"],
      image: "https://images.unsplash.com/photo-1617196035154-a9e9d5ab9e76?w=600&q=80"
    },

    // ESPECIAIS DO CHEF
    {
      id: "ec01", category: "especiais",
      name: "Sashimi Atum Flambado",
      description: "Cortes de atum maçaricados na hora com toque de azeite trufado — criação exclusiva.",
      composition: ["Atum fresco", "Azeite trufado", "Flor de sal", "Microverdes"],
      price: 58.00, serves: "1 pessoa", units: "5 cortes",
      tags: ["chef", "premium", "exclusivo"],
      image: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=80"
    },
    {
      id: "ec02", category: "especiais",
      name: "Bolinho de Salmão",
      description: "Croquete de salmão com cream cheese derretendo por dentro, crosta dourada.",
      composition: ["Salmão", "Cream cheese", "Cebola roxa", "Ervas", "Panko"],
      price: 36.00, serves: null, units: "4 unid.",
      tags: ["chef", "popular"],
      image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80"
    },
    {
      id: "ec03", category: "especiais",
      name: "Wonton de Frango com Catupiry",
      description: "Massa wonton frita recheada com frango desfiado e catupiry.",
      composition: ["Massa wonton", "Frango desfiado", "Catupiry", "Cebolinha"],
      price: 32.00, serves: null, units: "4 unid.",
      tags: [],
      image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&q=80"
    },

    // COMBINADOS
    {
      id: "c01", category: "combinados",
      name: "Combinado Iniciante — 30 Peças",
      description: "Perfeito para explorar o cardápio Gaman pela primeira vez.",
      composition: [
        "2 Bolinhos de Salmão", "4 Wonton de Frango c/ Catupiry",
        "4 Hot Filadélfia", "2 Harumakis de Camarão",
        "5 Tempurá de Peixe Branco", "5 Robata de Camarão",
        "4 Sashimi Salmão Toast Trufado", "2 Gunkans Salmão Alho Poró",
        "2 Palmitos Roll"
      ],
      price: 168.00, serves: "2-3 pessoas", units: "30 peças",
      tags: ["popular", "melhor valor"],
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80"
    },
    {
      id: "c02", category: "combinados",
      name: "Combinado Light S/ Arroz — 22 Peças",
      description: "Para quem prefere leveza — sem arroz, sem abrir mão do sabor.",
      composition: [
        "1 Sunomono", "1 Ceviche de Peixe Branco",
        "2 Sashimi de Salmão", "2 Sashimi Salmão Flambado",
        "2 Sashimi de Atum", "4 Robata de Camarão",
        "4 Robata de Lula", "2 Gunkans Palmito Roll",
        "4 Hots Especial"
      ],
      price: 142.00, serves: "1-2 pessoas", units: "22 peças",
      tags: ["sem glúten", "sem arroz"],
      image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=600&q=80"
    },
    {
      id: "c03", category: "combinados",
      name: "Combinado Sashimi Gaman — 18 Peças",
      description: "O melhor do mar em 18 cortes premium selecionados pelo chef.",
      composition: [
        "4 Sashimi Salmão", "2 Sashimi Peixe Branco",
        "2 Sashimi Atum", "2 Sashimi Haddock",
        "2 Sashimi Polvo", "2 Sashimi Camarão",
        "4 Sashimi Salmão Trufado"
      ],
      price: 188.00, serves: "1-2 pessoas", units: "18 peças",
      tags: ["premium", "chef", "sem glúten"],
      image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80"
    },

    // SOBREMESAS
    {
      id: "sb01", category: "sobremesas",
      name: "Mochi de Morango",
      description: "Bolinho japonês de arroz com recheio de morango e creme.",
      composition: ["Massa mochi", "Morango", "Creme de baunilha"],
      price: 22.00, serves: null, units: "2 unid.",
      tags: [],
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80"
    },
    {
      id: "sb02", category: "sobremesas",
      name: "Temaki de Nutella",
      description: "Cone crocante com Nutella, morango e granola — o favorito dos clientes.",
      composition: ["Massa crocante", "Nutella", "Morango", "Granola"],
      price: 28.00, serves: "1 pessoa", units: null,
      tags: ["popular", "vegetariano"],
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80"
    },

    // BEBIDAS
    {
      id: "b01", category: "bebidas",
      name: "Sake Tradicional",
      description: "Saquê importado do Japão servido frio ou quente.",
      composition: ["Arroz fermentado", "Água pura japonesa"],
      price: 38.00, serves: "1 pessoa", units: "300ml",
      tags: ["alcoólico"],
      image: "https://images.unsplash.com/photo-1577003833619-76bbd7f82948?w=600&q=80"
    },
    {
      id: "b02", category: "bebidas",
      name: "Chá Verde Quente",
      description: "Chá sencha japonês premium servido na temperatura ideal.",
      composition: ["Folhas sencha japonesas", "Água filtrada a 80°C"],
      price: 14.00, serves: "1 pessoa", units: "300ml",
      tags: ["sem álcool", "quente"],
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80"
    },
    {
      id: "b03", category: "bebidas",
      name: "Água com Gás",
      description: "Água mineral com gás gelada.",
      composition: ["Água mineral"],
      price: 8.00, serves: "1 pessoa", units: "500ml",
      tags: [],
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80"
    },
  ]
};
