import './AncestorNewForm.css';

export default function createNewAncestor() {
    return (
        <div>
            <h1>Création d'un nouvel ancêtre</h1>
            <form>
                <label className="form-style" htmlFor="lastname">Nom</label>
                <input type="text" id="lastname" name="lastname" />
                <label className="form-style" htmlFor="firstname">Prénom</label>
                <input type="text" id="firstname" name="firstname" />
                <label className="form-style" htmlFor="birthdate">Date de naissance</label>
                <input type="date" id="birthdate" name="birthdate" />
                <label className="form-style" htmlFor="birth_place">Lieu de naissance</label>
                <input type="text" id="birth_place" name="birth_place" />
                <label className="form-style" htmlFor="wedding_date">Date de mariage</label>
                <input type="date" id="wedding_date" name="wedding_date" />
                <label className="form-style" htmlFor="wedding_place">Lieu de mariage</label>
                <input type="text" id="wedding_place" name="wedding_place" />
                <label className="form-style" htmlFor="death_date">Date de décès</label>
                <input type="date" id="death_date" name="death_date" />
                <label className="form-style" htmlFor="death_place">Lieu de décès</label>
                <input type="text" id="death_place" name="death_place" />
            </form>
        </div>
    )
}