import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Register fonts if needed (using standard ones for reliability in this environment)
const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#1a4a1a',
        paddingBottom: 20,
        marginBottom: 30,
    },
    logoSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoBox: {
        width: 32,
        height: 32,
        backgroundColor: '#3d7a18',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    logoText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    brandName: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: '#141f14',
    },
    invoiceTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3d7a18',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#7aaa58',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        fontSize: 10,
        color: '#4a7a3a',
    },
    value: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#141f14',
    },
    table: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#eef4cc',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#1a4a1a',
        padding: 8,
    },
    tableHeaderText: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eef4cc',
        padding: 8,
    },
    tableCell: {
        fontSize: 10,
        color: '#141f14',
    },
    totalSection: {
        marginTop: 30,
        alignItems: 'flex-end',
    },
    totalBox: {
        width: 200,
        backgroundColor: '#eef4cc',
        padding: 15,
        borderRadius: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 40,
        right: 40,
        borderTopWidth: 1,
        borderTopColor: '#eef4cc',
        paddingTop: 10,
        textAlign: 'center',
    },
    footerText: {
        fontSize: 8,
        color: '#7aaa58',
    }
});

interface InvoicePDFProps {
    id: string;
    data: {
        date: string;
        clientName: string;
        clientEmail: string;
        service: string;
        description: string;
        amount: number;
        reference: string;
    };
}

export function InvoicePDF({ id, data }: InvoicePDFProps) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.logoSection}>
                        <View style={styles.logoBox}>
                            <Text style={styles.logoText}>AI</Text>
                        </View>
                        <Text style={styles.brandName}>AIR DIASS</Text>
                    </View>
                    <Text style={styles.invoiceTitle}>FACTURE</Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Émetteur</Text>
                        <Text style={styles.value}>AIR DIASS Group</Text>
                        <Text style={styles.label}>Aéroport International Blaise Diagne</Text>
                        <Text style={styles.label}>Dakar, Sénégal</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Client</Text>
                        <Text style={styles.value}>{data.clientName}</Text>
                        <Text style={styles.label}>{data.clientEmail}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Détails de la facture</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Numéro de facture:</Text>
                        <Text style={styles.value}>{id}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Date d&apos;émission:</Text>
                        <Text style={styles.value}>{data.date}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Référence dossier:</Text>
                        <Text style={styles.value}>{data.reference}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderText, { flex: 3 }]}>Service</Text>
                        <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>Montant</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { flex: 3 }]}>{data.service} - {data.description}</Text>
                        <Text style={[styles.tableCell, { flex: 1, textAlign: 'right' }]}>{data.amount.toLocaleString()} XOF</Text>
                    </View>
                </View>

                <View style={styles.totalSection}>
                    <View style={styles.totalBox}>
                        <View style={styles.row}>
                            <Text style={[styles.label, { fontWeight: 'bold' }]}>TOTAL NET:</Text>
                            <Text style={[styles.value, { fontSize: 16, color: '#1a4a1a' }]}>{data.amount.toLocaleString()} XOF</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        AIR DIASS SARL • Capital Social 10.000.000 FCFA • NINEA 123456789 • RCCM SN-DKR-2024-B-000
                    </Text>
                    <Text style={[styles.footerText, { marginTop: 4 }]}>
                        Cette facture est générée électroniquement et ne nécessite pas de signature.
                    </Text>
                </View>
            </Page>
        </Document>
    );
}
