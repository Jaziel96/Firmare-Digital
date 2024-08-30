import { Container, Title, Table, Button, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Crea un cliente supabase en este archivo

export default function Documents() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const { data, error } = await supabase.from('documents').select('*');
    if (error) console.error(error);
    else setDocuments(data);
  };

  return (
    <Container>
      <Title>Gestión de Archivos PDF</Title>
      <Table>
        {/* Mapea y muestra documentos con opciones de firmar, descargar y compartir */}
      </Table>
    </Container>
  );
}
