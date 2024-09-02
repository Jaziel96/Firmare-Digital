"use client";

import { Container, Title, Button, Table, Loader, Box, FileInput, Modal } from "@mantine/core";
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
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleUpload = () => {
    if (selectedFile) {
      const newDocument: Document = {
        id: documents.length + 1,
        name: selectedFile.name,
        date: new Date().toISOString().split("T")[0],
      };
      setDocuments([...documents, newDocument]);
      setSelectedFile(null);
      setUploadModalOpen(false);
    }
  };

  return (
    <Container>
      <Title order={1} mb="lg">
        Mis Documentos
      </Title>

      <Box style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <Button onClick={() => setUploadModalOpen(true)}>Subir Documento</Button>
      </Box>

      <Modal
        opened={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Subir un nuevo documento"
      >
        <FileInput
          placeholder="Selecciona un archivo"
          value={selectedFile}
          onChange={setSelectedFile}
        />
        <Button fullWidth mt="md" onClick={handleUpload} disabled={!selectedFile}>
          Subir
        </Button>
      </Modal>

      {loading ? (
        <Loader />
      ) : (
        <Table striped highlightOnHover>
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
                  <Box style={{ display: "flex", gap: "0.5rem" }}>
                    <Button variant="outline" size="xs">
                      Ver
                    </Button>
                    <Button variant="outline" size="xs">
                      Firmar
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
