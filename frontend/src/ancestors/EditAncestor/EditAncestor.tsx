import * as React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleFileUploader from "../../components/SingleFileUploader/SingleFileUploader";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";
import { Ancestor } from "../../../../shared/types/types";
import { Gender } from "../../../../backend/src/ancestors/ancestor.entity";
import "./EditAncestor.css";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const calculateYearDifference = (dateSpan: {
  startDate: Date;
  endDate: Date;
}): number => {
  return dateSpan.endDate.getFullYear() - dateSpan.startDate.getFullYear();
};

type FormData = {
  lastname: string;
  firstname: string;
  birthdate: Date | null;
  birth_place: string | null;
  wedding_date: Date | null;
  wedding_place: string | null;
  death_date: Date | null;
  death_place: string | null;
  gender: Gender | null;
  occupation: string | null;
  image: string | null;
};

// interface editAncestorProps {
//     id: number;
// }

interface FormDataTemp {
  birthdate?: string | null;
  wedding_date?: string | null;
  death_date?: string | null;
}

const formatDateForMySQL = (date: Date | null): string | null => {
  if (!date) return null;
  return format(date, 'yyyy-MM-dd');
};

const transformToFormDataTemp = (formData: FormData): FormDataTemp => {
  return {
    birthdate: formData.birthdate
      ? formData.birthdate.toLocaleDateString("fr-CA").split("T")[0]
      : null,
    wedding_date: formData.wedding_date
      ? formData.wedding_date.toLocaleDateString("fr-CA").split("T")[0]
      : null,
    death_date: formData.death_date
      ? formData.death_date.toLocaleDateString("fr-CA").split("T")[0]
      : null,
  };
};

function convertEmptyStringsToNull<T>(obj: T): T {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (newObj[key as keyof T] === "") {
      newObj[key as keyof T] = null as any;
    }
  }
  return newObj;
}

export default function EditAncestor() {
// { id: number }: editAncestorProps
  const { id } = useParams<{ id: string }>();
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const dateFormat = "dd/MM/yyyy"; // variable qui change le format attendu.
  const dateSpan = {
    startDate: new Date(-62135596800000),
    endDate: new Date(),
  };

  useEffect(() => {
    // Fetch the ancestor data and set the form values
    const fetchAncestor = async () => {
      try {
        const response = await fetch(`http://localhost:3009/ancestors/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data: FormData = await response.json();

        // Conversion des string dates en objets Date ou null.
        const parseDates = (dateString: string | null): Date | null =>
          dateString ? new Date(dateString) : null;

        setValue("lastname", data.lastname || "");
        setValue("firstname", data.firstname || "");
        setValue("birthdate", parseDates(data.birthdate as string | null));
        setValue("birth_place", data.birth_place || null);
        setValue("wedding_date", parseDates(data.wedding_date as string | null));
        setValue("wedding_place", data.wedding_place || null);
        setValue("death_date", parseDates(data.death_date as string | null));
        setValue("death_place", data.death_place || null);
        setValue("gender", data.gender || null);
        setValue("occupation", data.occupation || null);
        setValue("image", data.image || null);
        
        setUploadedImageUrl(data.image || null);
        console.log("Uploaded image", data.image);
      } catch (error) {
        console.error("Erreur", error);
        setErrorMessage(
          "Erreur lors de la récupération des données. Veuillez réessayer."
        );
      }
    };

    fetchAncestor();
  }, [id, setValue]);

  const handleGenderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValue("gender", e.target.value as Gender);
  };

  const handleUploadSuccess = (imageUrl: string | null) => {
    console.log("URL de l'image après téléversement :", imageUrl);
    setUploadedImageUrl(`${imageUrl}`);
    setValue("image", imageUrl); // Enregistrer l'URL de l'image dans le formulaire
  };

  if (uploadedImageUrl) {
    console.log(
      "URL de l'image à afficher dans EditAncestor :",
      uploadedImageUrl
    );
  }

  const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
    setIsSubmitted(true);
    setErrorMessage("");

    const formDataTemp: FormDataTemp = transformToFormDataTemp(formData);
    const dataToSubmit = convertEmptyStringsToNull({
      ...formData,
      birthdate: formData.birthdate ? formatDateForMySQL(formData.birthdate) : null,
        wedding_date: formData.wedding_date ? formatDateForMySQL(formData.wedding_date) : null,
        death_date: formData.death_date ? formatDateForMySQL(formData.death_date) : null,
    });

    try {
      const response = await fetch(`http://localhost:3009/ancestors/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });
      console.log(dataToSubmit, "data to submit");
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("mise à jour réussie :", result);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        setTimeout(() => {
          navigate(`/ancestors/${result.id}`);
        }, 1000);
      }, 2000);
    } catch (error) {
      console.error("Erreur", error);
      setErrorMessage(
        "Erreur lors de la mise à jour des données. Veuillez réessayer."
      );
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <>
      <div className="form-container">
        <h1>Édition d'un ancêtre</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <label className="label-style">Nom</label>
            <input
              className="input-style"
              {...register("lastname", { required: true, maxLength: 255 })}
            />
          </div>
          <div className="input-container">
            <label className="label-style">Prénom</label>
            <input className="input-style" {...register("firstname")} />
          </div>
          <div className="input-container-image">
            <div
              className="dropzone-container"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div className="image">
                <label className="label-style" style={{ alignSelf: "start" }}>
                  Image
                </label>
              </div>
              <SingleFileUploader
                onUploadSuccess={handleUploadSuccess}
                {...register("image")}
              />
            </div>
          </div>
          <div className="input-container">
            <label className="label-style">Date de naissance</label>
            <Controller
              name="birthdate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  className="input-style-date"
                  onChange={(date: Date | null) => onChange(date)}
                  selected={value || null}
                  minDate={dateSpan.startDate}
                  maxDate={dateSpan.endDate}
                  dateFormat={dateFormat}
                  placeholderText="jj/mm/aa ou choisissez..."
                  locale={fr}
                  showMonthDropdown
                  showYearDropdown // Allows dropdown for year selection
                  scrollableYearDropdown // Allows scrolling through years
                  yearDropdownItemNumber={calculateYearDifference(dateSpan)}
                />
              )}
            />
          </div>
          <div className="input-container">
            <label className="label-style">Lieu de naissance</label>
            <input className="input-style" {...register("birth_place")} />
          </div>
          <div className="input-container">
            <label className="label-style">Date de mariage</label>
            <Controller
              name="wedding_date"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  className="input-style-date"
                  onChange={(date: Date | null) => onChange(date)}
                  selected={value || null}
                  minDate={dateSpan.startDate}
                  maxDate={dateSpan.endDate}
                  dateFormat={dateFormat}
                  placeholderText="jj/mm/aa ou choisissez..."
                  locale={fr}
                  showMonthDropdown
                  showYearDropdown // Allows dropdown for year selection
                  scrollableYearDropdown // Allows scrolling through years
                  yearDropdownItemNumber={calculateYearDifference(dateSpan)}
                />
              )}
            />
          </div>
          <div className="input-container">
            <label className="label-style">Lieu de mariage</label>
            <input className="input-style" {...register("wedding_place")} />
          </div>
          <div className="input-container">
            <label className="label-style">Date de décès</label>
            <Controller
              name="death_date"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  className="input-style-date"
                  onChange={(date: Date | null) => onChange(date)}
                  selected={value || null}
                  minDate={dateSpan.startDate}
                  maxDate={dateSpan.endDate}
                  dateFormat={dateFormat}
                  placeholderText="jj/mm/aa ou choisissez..."
                  locale={fr}
                  showMonthDropdown
                  showYearDropdown // Allows dropdown for year selection
                  scrollableYearDropdown // Allows scrolling through years
                  yearDropdownItemNumber={calculateYearDifference(dateSpan)}
                />
              )}
            />
          </div>
          <div className="input-container">
            <label className="label-style">Lieu de décès</label>
            <input className="input-style" {...register("death_place")} />
          </div>
          <div className="input-container">
            <label className="label-style">Genre</label>
            <select
              className="select"
              {...register("gender", {
                onChange: (e) => handleGenderChange(e),
              })}
            >
              <option value=""></option>
              <option value="female">Féminin</option>
              <option value="male">Masculin</option>
              <option value="unknown">Inconnu</option>
            </select>
          </div>
          <div className="input-container">
            <label className="label-style">Métier</label>
            <input className="input-style" {...register("occupation")} />
          </div>
          <button type="submit" className="click" disabled={isSubmitted}>
          {isSubmitted ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>
      </div>
      {showSuccessModal && (
        <div className="modal">
          <p>Mise à jour réussie !</p>
        </div>
      )}
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  );
}
