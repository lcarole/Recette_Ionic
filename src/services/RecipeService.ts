import { Storage } from "@ionic/storage";

export interface Recipe {
    id: number;
    name: string;
    ingredients: string[];
    steps: string[];
}

const storage = new Storage();
await storage.create();

const STORAGE_KEY = "recipes";

export const RecipeService = {
    /**
     * Récupère toute les recettes
     * @returns {Promise<Recipe[]>}
     */

    async GetAllRecipes(): Promise<Recipe[]> {
        const recipes = await storage.get(STORAGE_KEY);
        return recipes || [];
    },

    /**
     * Récupère une recette par son id
     * @returns {Promise<Recipe | undefined>}
     */

    async GetRecipeById(id: number): Promise<Recipe | undefined> {
        const recipes = await this.GetAllRecipes();
        return recipes.find((recipe) => recipe.id === id);
    },

    /** 
     * Ajoute une nouvelle recette
     * @param {Recipe}
     * @returns {Promise<void>}
     */

    async AddRecipe(recipe: Recipe): Promise<void> {
        const recipes = await this.GetAllRecipes();
        recipe.id = recipes.length + 1;
        recipes.push(recipe);
        await storage.set(STORAGE_KEY, recipes);
    },

    /**
     * Met à jour une recette
     * @param {Recipe}
     * @returns {Promise<void>}
     */

    async UpdateRecipe(recipe: Recipe): Promise<void> {
        const recipes = await this.GetAllRecipes();
        const index = recipes.findIndex((r) => r.id === recipe.id);
        recipes[index] = recipe;
        await storage.set(STORAGE_KEY, recipes);
    },

    /**
     * Supprime une recette
     * @param {number}
     * @returns {Promise<void>}
     */

    async DeleteRecipe(id: number): Promise<void> {
        const recipes = await this.GetAllRecipes();
        const filteredRecipes = recipes.filter((recipe) => recipe.id !== id);
        await storage.set(STORAGE_KEY, filteredRecipes);
    },
};