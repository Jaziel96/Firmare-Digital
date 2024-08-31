import { Container, Title, Button, Table, Loader } from "@mantine/core";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// Define el tipo de documento
interface Document {
  id: number;
  name: string;
  date: string;
}

export default function Documents() {
  const { data: session, status } = useSession();
  // Define el tipo del estado como Document[]
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      // Simula la carga de documentos
      setTimeout(() => {
        setDocuments([
          { id: 1, name: "Documento1.pdf", date: "2024-01-01" },
          { id: 2, name: "Documento2.pdf", date: "2024-01-02" },
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [status]);

  if (status === "loading") return <Loader />;
  if (status === "unauthenticated") return <p>No estás autenticado</p>;

  return (
    <Container>
      <Title order={1}>Mis Documentos</Title>
      <Button mt="md">Subir Documento</Button>
      {loading ? (
        <Loader />
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.name}</td>
                <td>{doc.date}</td>
                <td>
                  <Button variant="outline" size="xs">
                    Ver
                  </Button>
                  <Button variant="outline" size="xs" ml="xs">
                    Firmar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
