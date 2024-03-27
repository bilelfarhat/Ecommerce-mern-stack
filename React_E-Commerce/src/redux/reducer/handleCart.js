const cart = []; // Initialiser le panier avec un tableau vide

const handleCart = (state = cart, action) => {
    const product = action.payload;

    switch (action.type) {
        case "ADDITEM":
            // Votre logique d'ajout d'article ici
            const exist = state.find((x) => x._id === product._id);
            if (exist) {
            
                      // Si le produit existe déjà, augmente la quantité
                return state.map((x) =>
                x._id === product._id ? { ...x, qty: x.qty + 1 } : x
            );

                
              
            } else {
                // Si le produit n'existe pas, ajoute un nouvel élément au panier
                return [...state, { ...product, qty: 1 }];
            }

        case "DELITEM":
            // Votre logique de suppression d'article ici
            const exist2 = state.find((x) => x._id === product._id);
            if (exist2.qty === 1) {
                return state.filter((x) => x._id !== exist2._id);
            } else {
                return state.map((x) =>
                    x._id === product._id ? { ...x, qty: x.qty - 1 } : x
                );
            }

        default:
            return state;
    }
};

export default handleCart;
