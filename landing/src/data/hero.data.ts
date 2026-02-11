export const AST_EXAMPLE = `// Aca está mal xd
{
  "op": "AND",
  "rules": [
    { "field": "cart.total", "operator": ">=", "value": 500 },
    {
      "op": "OR",
      "rules": [
        { "field": "customer.type", "operator": "==", "value": "premium" },
        { "field": "customer.vip", "operator": "==", "value": true }
      ]
    }
  ]`;

export const RESPONSE_EXAMPLE = `{
  "matched": true,
  "actions": [
    { 
      "type": "discount", "value": 10 
    },
    { 
      "type": "tag", "value": "VIP" 
    }
  ],
  "request_code": "VENTA-2026-000184"
}
  `;

export const HERO_BADGES = [
  "Request–Response (Pull)",
  "AND/OR/NOT (AST)",
  "Evidencia por regla",
  "sha256 token",
] as const;

export const HERO_KPIS = [
  { label: "Multi-tenant", value: "Por Org." },
  { label: "Auditoría", value: "Forense" },
  { label: "Tokens", value: "No plano" },
  { label: "SQL Server", value: "Friendly" },
] as const;

export const DEMO_KPIS = [
  { label: "duración", value: "12ms" },
  { label: "acciones", value: "2" },
  { label: "token", value: "sha256" },
] as const;


export const HEADERS_EXAMPLE = [
  { key: "Accept", value: "application/json" },
  { key: "Content-Type", value: "application/json" },
];