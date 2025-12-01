import { Helmet } from 'react-helmet-async';

interface SchemaJSONLDProps {
    data: Record<string, any>;
}

export default function SchemaJSONLD({ data }: SchemaJSONLDProps) {
    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(data)}
            </script>
        </Helmet>
    );
}
