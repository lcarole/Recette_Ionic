import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { RecipeService } from "../services/RecipeService";

const AddRecipe: React.FC  = () => {
    const [name, setName] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    const [steps, setSteps] = useState<string>('');

    const handleAddRecipe = async () => {
        const recipe = {
            id: 0,
            name,
            ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
            steps: steps.split(',').map((step) => step.trim())
        };
        await RecipeService.AddRecipe(recipe);
        window.location.href = '/';
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/"/>
                    </IonButtons>
                    <IonTitle>Ajouter une recette</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked"> Recette</IonLabel>
                        <IonInput value={name} placeholder="Pâtes à la carbonara" onIonChange={(e) => setName(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked"> Ingrédients</IonLabel>
                        <IonInput value={ingredients} placeholder="Séparer les ingrédeints par une virgule" onIonChange={(e) => setIngredients(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked"> Étapes</IonLabel>
                        <IonInput value={steps} placeholder="Séparer les étapes par une virgule" onIonChange={(e) => setSteps(e.detail.value!)}></IonInput>
                    </IonItem>

                    <IonButton expand="block" onClick={handleAddRecipe}>Ajouter la recette</IonButton>
                </IonList>
            </IonContent>
        </IonPage>

    )
}

export default AddRecipe;