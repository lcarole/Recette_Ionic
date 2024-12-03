import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Recipe, RecipeService } from '../services/RecipeService';

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await RecipeService.GetAllRecipes();
      setRecipes(data);
    };
    fetchRecipes();
  }, []);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recettes de cuisine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {recipes.map((recipe) => (
            <IonItem key={recipe.id} routerLink={`/details/${recipe.id}`}>
              <IonLabel>
                <h2>{recipe.name}</h2>
                <h3>{recipe.ingredients.join(', ')}</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonButton expand="block" routerLink="/addrecipe">Ajouter une recette</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
