# Technical Documentation KeduFron't

# URL de l'API

> https://api.kedufront.juniortaker.com/

# Models

## Modèle d'Item

Le modèle d'Item représente une entité d'élément avec des propriétés telles que le nom, la description, le prix, l'image, et la date de création.

### Propriétés du Modèle

1. **_id**
   - Type: Entier (auto-incrément)
   - Description: Identifiant unique auto-incrémenté de l'élément.

2. **name**
   - Type: Chaîne de caractères
   - Description: Le nom de l'élément.

3. **description**
   - Type: Chaîne de caractères
   - Description: La description de l'élément.

4. **price**
   - Type: Entier
   - Description: Le prix de l'élément.

5. **image**
   - Type: Chaîne de caractères
   - Description: Le chemin ou l'URL de l'image associée à l'élément.

6. **createdIn**
   - Type: Chaîne de caractères
   - Description: La date de création de l'élément.

### Exemple d'Objet Item

```json
{
  "_id": 1,
  "name": "Nom de l'élément",
  "description": "Description de l'élément",
  "price": 10,
  "image": "/images/item1.jpg",
  "createdIn": "2023-11-16"
}
```

# Routes

# [ Item ]

## Récupération de tous les Items

- **Endpoint URL:** `GET /item/`
- **Description:** Récupère tous les items présents dans la base de données.
- **Paramètres ou Body:** Aucun.
- **Example:**
  - **Request:**
    ```http
    GET /item/
    ```
  - **Response:**
    ```json
    [
      {
        "_id": 1,
        "name": "Nom de l'élément",
        "description": "Description de l'élément",
        "price": 10,
        "image": "/static/img/1.png",
        "createdIn": "2023-11-16"
      },
      // Autres items...
    ]
    ```
    - **Réponse 404 (Non trouvé)**
      - Description: Aucun item n'a été trouvé.
      - Contenu de la réponse: Un message indiquant que l'item n'a pas été trouvé.

---

## Récupération d'un Item par ID

- **Endpoint URL:** `GET /item/<int:id>`
- **Description:** Récupère un item spécifique en utilisant son ID.
- **Paramètres ou Body:**
  - `id` (entier): L'ID de l'item à récupérer.
- **Example:**
  - **Request:**
    ```http
    GET /item/1
    ```
  - **Response:**
    ```json
    {
      "ok": true,
      "item": {
        "_id": 1,
        "name": "Nom de l'élément",
        "description": "Description de l'élément",
        "price": 10,
        "image": "/static/img/1.png",
        "createdIn": "2023-11-16"
      }
    }
    ```
    - **Réponse 404 (Non trouvé)**
      - Description: Aucun item n'a été trouvé avec l'ID spécifié.
      - Contenu de la réponse: Un message indiquant que l'item n'a pas été trouvé.

---

## Récupération de l'Image d'un Item par ID

- **Endpoint URL:** `GET /item/picture/<int:id>`
- **Description:** Récupère l'image associée à un item en utilisant son ID.
- **Paramètres ou Body:**
  - `id` (entier): L'ID de l'item pour lequel récupérer l'image.
- **Example:**
  - **Request:**
    ```http
    GET /item/picture/1
    ```
  - **Response:**
    - **Réponse 200 (OK)**
      - Description: La requête a été traitée avec succès.
      - Contenu de la réponse: L'image de l'item.
    - **Réponse 404 (Non trouvé)**
      - Description: Aucune image a été trouvée pour l'item avec l'ID spécifié.
      - Contenu de la réponse: Un message indiquant que l'image n'a pas été trouvée.

---

# [ Order ]


## Création d'une Commande

- **Endpoint URL:** `POST /order/`
- **Description:** Crée une nouvelle commande en utilisant les informations fournies.
- **Paramètres ou Body:**
  - JSON dans le corps de la requête avec les détails de la commande.
    - `email` (chaîne de caractères, requis): Adresse e-mail du client.
    - `name` (chaîne de caractères, requis): Nom du client.
    - `address` (chaîne de caractères, requis, longueur minimale de 5 caractères): Adresse de livraison.
    - `cart` (liste d'objets `ItemCart`, requis, longueur minimale de 1):
      - `id` (entier, requis, valeur minimale de 1): ID de l'article.
      - `amount` (entier, requis, valeur minimale de 1): Quantité de l'article.

- **Example:**
  - **Request:**
    ```http
    POST /order/
    ```
    ```json
    {
      "email": "client@example.com",
      "name": "Client Nom",
      "address": "Adresse de Livraison",
      "cart": [
        {
          "id": 1,
          "amount": 2
        },
        // Autres articles...
      ]
    }
    ```
  - **Réponse:**
    ```json
    {
      "ok": true,
      "command_id": "CMD-12345-ABCDEF-KDF"
    }
    ```

    - **Réponse 400 (Erreur de Validation)**
      - Description: La validation des données a échoué.
      - Contenu de la réponse: Un message indiquant la nature de l'erreur de validation.

    - **Réponse 201 (Créé)**
      - Description: La commande a été créée avec succès.
      - Contenu de la réponse: Un objet JSON indiquant le succès de la création et l'ID de la commande.
