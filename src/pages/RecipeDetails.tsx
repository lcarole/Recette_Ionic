import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Recipe, RecipeService } from "../services/RecipeService";

const RecipeDetails: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        const fetchRecipeById = async () => {
            const data = await RecipeService.GetRecipeById(parseInt(id));
            setRecipe(data || null);
        };
        fetchRecipeById();
    }, [id]);
    
    const deleteRecipe = async () => {
        await RecipeService.DeleteRecipe(parseInt(id));
        window.location.href = '/';
    }

    if(recipe){
        return(
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/"/>
                        </IonButtons>
                        <IonTitle>{recipe.name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Ingrédients</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonList>
                            {recipe.ingredients.map((ingredient, index) => (
                                <IonItem key={index}>
                                    {ingredient}
                                </IonItem>
                            ))}
                            </IonList>
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Etapes</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonList>
                            {recipe.steps.map((step, index) => (
                                <IonItem key={index}>
                                    {step}
                                </IonItem>
                            ))}
                            </IonList>
                        </IonCardContent>
                    </IonCard>
                    <IonButton expand="block" color="danger" onClick={deleteRecipe}>
                        Supprimer la recette
                    </IonButton>
                </IonContent>
            </IonPage>
        )
    }
}

export default RecipeDetails;