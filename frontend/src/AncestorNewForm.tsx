export default function createNewAncestor() {
    return (
        <div>
            <h1>Création d'un nouvel ancêtre</h1>
            <form>
                <label htmlFor="lastname">Nom</label>
                <input type="text" id="lastname" name="lastname" />
                <label htmlFor="firstname">Prénom</label>
                <input type="text" id="firstname" name="firstname" />
                <label htmlFor="birthdate">Date de naissance</label>
                <input type="date" id="birthdate" name="birthdate" />
                <label htmlFor="birth_place">Lieu de naissance</label>
                <input type="text" id="birth_place" name="birth_place" />
                <label htmlFor="wedding_date">Date de mariage</label>
                <input type="date" id="wedding_date" name="wedding_date" />
                <label htmlFor="wedding_place">Lieu de mariage</label>
                <input type="text" id="wedding_place" name="wedding_place" />
                <label htmlFor="death_date">Date de décès</label>
                <input type="date" id="death_date" name="death_date" />
                <label htmlFor="death_place">Lieu de décès</label>
                <input type="text" id="death_place" name="death_place" />
            </form>
        </div>
    )
}