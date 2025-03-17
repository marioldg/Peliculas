import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExamenRecuperacion from "./pelis.js";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            titulo: "Película de prueba",
            categoria: ["Comedia"],
            director: "Director de prueba",
            año: 2025,
            actoresPrincipales: ["Actor 1", "Actor 2"],
            sinopsis: "Sinopsis de prueba",
            valoraciones: [
              { usuario: "Usuario 1", comentario: "Muy buena", puntuacion: 8 },
              { usuario: "Usuario 2", comentario: "Mala", puntuacion: 2 },
            ],
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks(); // Limpia el mock después de cada prueba
});

test("Test básico para comprobar que Jest está funcionando", () => {
  expect(true).toBe(true);
});

test("Renderiza las categorías correctamente", () => {
  render(<ExamenRecuperacion />);

  // Verificamos que las categorías están en el documento
  expect(screen.getByText("Comedia")).toBeInTheDocument();
  expect(screen.getByText("Thriller")).toBeInTheDocument();
  expect(screen.getByText("Drama")).toBeInTheDocument();
  expect(screen.getByText("Aventura")).toBeInTheDocument();
  expect(screen.getByText("Ciencia Ficción")).toBeInTheDocument();
});

test("Se renderizan los botones", async () => {
  render(<ExamenRecuperacion />);

  const botonOpiniones = await screen.findByText("Opiniones");
  const botonSiguiente = await screen.findByText("Siguiente");
  const botonAñadir = await screen.findByText("Añadir");
  const botonEliminar = await screen.findByText("Eliminar");

  expect(botonOpiniones).toBeInTheDocument();
  expect(botonSiguiente).toBeInTheDocument();
  expect(botonAñadir).toBeInTheDocument();
  expect(botonEliminar).toBeInTheDocument();
});

test("Se muestran opiniones", async () => {
  render(<ExamenRecuperacion />);

  const botonOpiniones = await screen.findByText("Opiniones");

  await userEvent.click(botonOpiniones);

  expect(screen.getByText(/muy buena/i)).toBeInTheDocument(); //Busca parcialmente "muy buena", ya que no eta solo en una etiquita
  expect(screen.getByText("Usuario 1 - Muy buena - 8")).toBeInTheDocument(); // Busca todo el mensaje
});

test("Se muestran opiniones y el boton siguiente funciona", async () => {
  render(<ExamenRecuperacion />);

  const botonOpiniones = await screen.findByText("Opiniones");
  const botonSiguiente = await screen.findByText("Siguiente");

  await userEvent.click(botonOpiniones);
  await userEvent.click(botonSiguiente);

  expect(screen.getByText(/mala/i)).toBeInTheDocument(); //Busca parcialmente "muy buena", ya que no eta solo en una etiquita
  expect(screen.getByText("Usuario 2 - Mala - 2")).toBeInTheDocument(); // Busca todo el mensaje
});

test("Se borra la opinion", async () => {
  render(<ExamenRecuperacion />);

  const botonOpiniones = await screen.findByText("Opiniones");
  const botonEliminar = await screen.findByText("Eliminar");

  await userEvent.click(botonOpiniones);
  await userEvent.click(botonEliminar);
  await userEvent.click(botonEliminar);

  // Comprobar que los textos de valoraciones ya no existen en el DOM
  //queryByText comprueba si el texto esta en el DOM, si no esta devuelve null
  //To be null comprueba si es null
  expect(screen.queryByText("Usuario 2 - Mala - 2")).toBeNull();
  expect(screen.queryByText("Usuario 1 - Muy buena - 8")).toBeNull(); // Busca todo el mensaje
});

test("Se añade una opinion", async () => {
  render(<ExamenRecuperacion />);

  const botonOpiniones = await screen.findByText("Opiniones");
  const botonAñadir = await screen.findByText("Añadir");
  const botonSiguiente = await screen.findByText("Siguiente");

  await userEvent.click(botonOpiniones);
  await userEvent.click(botonAñadir);

  expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/puntuación/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/comentario/i)).toBeInTheDocument();

  await userEvent.type(screen.getByLabelText(/nombre/i), "Usuario Test");
  await userEvent.type(screen.getByLabelText(/Puntuación/i), "3");
  await userEvent.type(screen.getByLabelText(/Comentario/i), "Locura");

  const botonAñadirReview = await screen.findByText("Añadir Review");
  await userEvent.click(botonAñadirReview);
  await userEvent.click(botonSiguiente);
  await userEvent.click(botonSiguiente);
  expect(screen.getByText("Usuario Test - Locura - 3")).toBeInTheDocument(); // Busca todo el mensaje
});
