import * as React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleFileUploader from "../../components/SingleFileUploader/SingleFileUploader";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { Ancestor } from "../../../../shared/types/types";
import { Gender } from "../../../../backend/src/ancestors/ancestor.entity";
import "./AncestorNewForm.css";
import "react-datepicker/dist/react-datepicker.css";

type FormData = Ancestor;

interface FormDataTemp {
  birthdate?: string | null;
  wedding_date?: string | null;
  death_date?: string | null;
}

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

export default function CreateAncestor() {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState<Boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const dateFormat = "dd/MM/yyyy"; // variable qui change le format attendu.
  const dateSpan = {
    startDate: new Date(-62135596800000),
    endDate: new Date(),
  };

  function calculateYearDifference(dateSpan: {
    startDate: Date;
    endDate: Date;
  }) {
    const millisecondsInAYear = 1000 * 60 * 60 * 24 * 365.25; // Prendre en compte les années bissextiles
    const yearDifference = Math.floor(
      (dateSpan.endDate.getTime() - dateSpan.startDate.getTime()) /
        millisecondsInAYear
    );
    return yearDifference;
  }

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
      "URL de l'image à afficher dans AncestorNewForm :",
      uploadedImageUrl
    );
  }

  const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
    setIsSubmitted(true);

    const formDataTemp: FormDataTemp = transformToFormDataTemp(formData);
    const dataToSubmit = convertEmptyStringsToNull({
      ...formData,
      ...formDataTemp,
    });

    try {
      const response = await fetch("http://localhost:3009/ancestors/new", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement des données");
      }

      const result = await response.json();
      console.log("enregistrement réussi :", result);
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
        "Erreur lors de l'enregistrement des données. Veuillez réessayer."
      );
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <>
      <div className="form-container">
        <h1>Ajout d'un nouvel ancêtre</h1>
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
            >
              <div className="image">
                <label className="label-style" style={{ alignSelf: "start" }}>
                  Image
                </label>
              </div>
              {/* <input className="input-style" {...register("image")} /> */}
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
          <button type="submit" className="click">
            Enregistrer
          </button>
        </form>
      </div>
      {showSuccessModal && (
        <div className="modal">
          <p>Enregistrement réussi !</p>
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
