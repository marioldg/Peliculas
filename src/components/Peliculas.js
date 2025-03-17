import React, { useState, useEffect } from "react";
import { Card, CardTitle, Form, Button } from "react-bootstrap";

function Peliculas() {
  const [añadirComentario, setAñadirComentario] = useState(false);
  const [peliSeleccionada, setPeliSeleccionada] = useState(null);
  const [peliculas, setPeliculas] = useState([]);
  const [comentario, SetComentario] = useState(0);

  const peliculasComedia = peliculas.filter((pelicula) =>
    pelicula.categoria.includes("Comedia")
  );

  const peliculasThriller = peliculas.filter((pelicula) =>
    pelicula.categoria.includes("Thriller")
  );

  const peliculasDrama = peliculas.filter((pelicula) =>
    pelicula.categoria.includes("Drama")
  );

  const peliculasAventura = peliculas.filter((pelicula) =>
    pelicula.categoria.includes("Aventura")
  );

  const peliculasFiccion = peliculas.filter((pelicula) =>
    pelicula.categoria.includes("Ciencia Ficción")
  );

  const handlePeliChange = (peli) => {
    if (peli === peliSeleccionada) {
      setPeliSeleccionada(null);
    } else {
      setPeliSeleccionada(peli);
    }
  };

  const eliminarComentario = (peli) => {
    if (peli.comentario === comentario) {
      SetComentario(null);
    }
  };

  const handleComentChange = (peli) => {
    if (peli.valoraciones.length <= comentario + 1) {
      SetComentario(0);
    } else {
      SetComentario(comentario + 1);
    }
  };

  const handleAñadirComentario = (peli) => {
    setAñadirComentario(true);
  };

  useEffect(() => {
    fetch("/peliculas.json")
      .then((response) => response.json())
      .then((pp) => {
        setPeliculas(pp);
      })
      .catch((error) => console.error("Error al cargar el JSON:", error));
  }, []);

  if (peliculas.length === 0) {
    return <div>Peliculas cargando...</div>;
  }

  return (
    <div>
      <h1>PELICULAS DISPONIBLES</h1>
      {peliculasThriller.map((peliThriller, index) => (
        <Card>
          {peliThriller.categoria}
          <Card>
            <Card.Img
              style={{ width: "400px" }}
              variant="top"
              src={peliThriller.titulo + ".jpeg"}
            />
            <Card.Body>
              <CardTitle>
                <strong>{peliThriller.titulo}</strong>
              </CardTitle>
              <Card.Text>{peliThriller.año}</Card.Text>
              <Card.Text>{peliThriller.director}</Card.Text>
              <Card.Text>{peliThriller.actoresPrincipales}</Card.Text>
              <Card.Text>{peliThriller.sinopsis}</Card.Text>
              <Card.Text>{peliThriller.duracion}</Card.Text>
              <Card.Text>{peliThriller.idiomaOriginal}</Card.Text>
              <Card.Text>{peliThriller.paisOrigen}</Card.Text>
              <Button
                variant="primary"
                onClick={() => handlePeliChange(peliThriller)}
              >
                Ver más
              </Button>

              {peliSeleccionada === peliThriller && (
                <Card key={index}>
                  <Card.Body>
                    <Card.Title>
                      {peliThriller.valoraciones[comentario].comentario}
                    </Card.Title>
                    <Button
                      variant="primary"
                      onClick={() => handleComentChange(peliThriller)}
                    >
                      Siguiente
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleAñadirComentario()}
                    >
                      Añadir
                    </Button>

                    <Button
                      variant="primary"
                      onClick={() => eliminarComentario()}
                    >
                      Eliminar
                    </Button>
                    {añadirComentario === true && (
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control placeholder="Escribe tu nombre" />
                          <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Puntuacion</Form.Label>
                          <Form.Control placeholder="Puntuacion" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Comentario</Form.Label>
                          <Form.Control placeholder="Escribe tu comentario acerca de la pelicula" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    )}
                  </Card.Body>
                </Card>
              )}
            </Card.Body>
          </Card>
        </Card>
      ))}

      {peliculasComedia.map((peliComedia, index) => (
        <Card>
          {peliComedia.categoria}
          <Card>
            <Card.Img
              style={{ width: "400px" }}
              variant="top"
              src={peliComedia.titulo + ".jpeg"}
            />
            <Card.Body>
              <CardTitle>
                <strong>{peliComedia.titulo}</strong>
              </CardTitle>
              <Card.Text>{peliComedia.año}</Card.Text>
              <Card.Text>{peliComedia.director}</Card.Text>
              <Card.Text>{peliComedia.actoresPrincipales}</Card.Text>
              <Card.Text>{peliComedia.sinopsis}</Card.Text>
              <Card.Text>{peliComedia.duracion}</Card.Text>
              <Card.Text>{peliComedia.idiomaOriginal}</Card.Text>
              <Card.Text>{peliComedia.paisOrigen}</Card.Text>
              <Button
                variant="primary"
                onClick={() => handlePeliChange(peliComedia)}
              >
                Ver más
              </Button>

              {peliSeleccionada === peliComedia && (
                <Card key={index}>
                  <Card.Body>
                    <Card.Title>
                      {peliComedia.valoraciones[comentario].comentario}
                    </Card.Title>
                    <Button
                      variant="primary"
                      onClick={() => handleComentChange(peliComedia)}
                    >
                      Siguiente
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleAñadirComentario()}
                    >
                      Añadir
                    </Button>

                    <Button
                      variant="primary"
                      onClick={() => eliminarComentario()}
                    >
                      Eliminar
                    </Button>
                    {añadirComentario === true && (
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control placeholder="Escribe tu nombre" />
                          <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Puntuacion</Form.Label>
                          <Form.Control placeholder="Puntuacion" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Comentario</Form.Label>
                          <Form.Control placeholder="Escribe tu comentario acerca de la pelicula" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    )}
                  </Card.Body>
                </Card>
              )}
            </Card.Body>
          </Card>
        </Card>
      ))}

      {peliculasDrama.map((peliDrama, index) => (
        <Card>
          {peliDrama.categoria}
          <Card>
            <Card.Img
              style={{ width: "400px" }}
              variant="top"
              src={peliDrama.titulo + ".jpeg"}
            />
            <Card.Body>
              <CardTitle>
                <strong>{peliDrama.titulo}</strong>
              </CardTitle>
              <Card.Text>{peliDrama.año}</Card.Text>
              <Card.Text>{peliDrama.director}</Card.Text>
              <Card.Text>{peliDrama.actoresPrincipales}</Card.Text>
              <Card.Text>{peliDrama.sinopsis}</Card.Text>
              <Card.Text>{peliDrama.duracion}</Card.Text>
              <Card.Text>{peliDrama.idiomaOriginal}</Card.Text>
              <Card.Text>{peliDrama.paisOrigen}</Card.Text>
              <Button
                variant="primary"
                onClick={() => handlePeliChange(peliDrama)}
              >
                Ver más
              </Button>

              {peliSeleccionada === peliDrama && (
                <Card key={index}>
                  <Card.Body>
                    <Card.Title>
                      {peliDrama.valoraciones[comentario].comentario}
                    </Card.Title>
                    <Button
                      variant="primary"
                      onClick={() => handleComentChange(peliDrama)}
                    >
                      Siguiente
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleAñadirComentario()}
                    >
                      Añadir
                    </Button>

                    <Button
                      variant="primary"
                      onClick={() => eliminarComentario()}
                    >
                      Eliminar
                    </Button>
                    {añadirComentario === true && (
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control placeholder="Escribe tu nombre" />
                          <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Puntuacion</Form.Label>
                          <Form.Control placeholder="Puntuacion" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Comentario</Form.Label>
                          <Form.Control placeholder="Escribe tu comentario acerca de la pelicula" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    )}
                  </Card.Body>
                </Card>
              )}
            </Card.Body>
          </Card>
        </Card>
      ))}

      {peliculasAventura.map((peliAventura, index) => (
        <Card>
          {peliAventura.categoria}
          <Card>
            <Card.Img
              style={{ width: "400px" }}
              variant="top"
              src={peliAventura.titulo + ".jpeg"}
            />
            <Card.Body>
              <CardTitle>
                <strong>{peliAventura.titulo}</strong>
              </CardTitle>
              <Card.Text>{peliAventura.año}</Card.Text>
              <Card.Text>{peliAventura.director}</Card.Text>
              <Card.Text>{peliAventura.actoresPrincipales}</Card.Text>
              <Card.Text>{peliAventura.sinopsis}</Card.Text>
              <Card.Text>{peliAventura.duracion}</Card.Text>
              <Card.Text>{peliAventura.idiomaOriginal}</Card.Text>
              <Card.Text>{peliAventura.paisOrigen}</Card.Text>
              <Button
                variant="primary"
                onClick={() => handlePeliChange(peliAventura)}
              >
                Ver más
              </Button>

              {peliSeleccionada === peliAventura && (
                <Card key={index}>
                  <Card.Body>
                    <Card.Title>
                      {peliAventura.valoraciones[comentario].comentario}
                    </Card.Title>
                    <Button
                      variant="primary"
                      onClick={() => handleComentChange(peliAventura)}
                    >
                      Siguiente
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleAñadirComentario()}
                    >
                      Añadir
                    </Button>

                    <Button
                      variant="primary"
                      onClick={() => eliminarComentario()}
                    >
                      Eliminar
                    </Button>
                    {añadirComentario === true && (
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control placeholder="Escribe tu nombre" />
                          <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Puntuacion</Form.Label>
                          <Form.Control placeholder="Puntuacion" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Comentario</Form.Label>
                          <Form.Control placeholder="Escribe tu comentario acerca de la pelicula" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    )}
                  </Card.Body>
                </Card>
              )}
            </Card.Body>
          </Card>
        </Card>
      ))}

      {peliculasFiccion.map((peliFiccion, index) => (
        <Card>
          {peliFiccion.categoria}
          <Card>
            <Card.Img
              style={{ width: "400px" }}
              variant="top"
              src={peliFiccion.titulo + ".jpeg"}
            />
            <Card.Body>
              <CardTitle>
                <strong>{peliFiccion.titulo}</strong>
              </CardTitle>
              <Card.Text>{peliFiccion.año}</Card.Text>
              <Card.Text>{peliFiccion.director}</Card.Text>
              <Card.Text>{peliFiccion.actoresPrincipales}</Card.Text>
              <Card.Text>{peliFiccion.sinopsis}</Card.Text>
              <Card.Text>{peliFiccion.duracion}</Card.Text>
              <Card.Text>{peliFiccion.idiomaOriginal}</Card.Text>
              <Card.Text>{peliFiccion.paisOrigen}</Card.Text>
              <Button
                variant="primary"
                onClick={() => handlePeliChange(peliFiccion)}
              >
                Ver más
              </Button>

              {peliSeleccionada === peliFiccion && (
                <Card key={index}>
                  <Card.Body>
                    <Card.Title>
                      {peliFiccion.valoraciones[comentario].comentario}
                    </Card.Title>
                    <Button
                      variant="primary"
                      onClick={() => handleComentChange(peliFiccion)}
                    >
                      Siguiente
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleAñadirComentario()}
                    >
                      Añadir
                    </Button>

                    <Button
                      variant="primary"
                      onClick={() => eliminarComentario()}
                    >
                      Eliminar
                    </Button>
                    {añadirComentario === true && (
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control placeholder="Escribe tu nombre" />
                          <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Puntuacion</Form.Label>
                          <Form.Control placeholder="Puntuacion" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Comentario</Form.Label>
                          <Form.Control placeholder="Escribe tu comentario acerca de la pelicula" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Form>
                    )}
                  </Card.Body>
                </Card>
              )}
            </Card.Body>
          </Card>
        </Card>
      ))}
    </div>
  );
}
export default Peliculas;
