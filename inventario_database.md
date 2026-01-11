# Inventário de Banco de Dados - Invoice Unlocker

**Versão:** 1.0.0  
**Status:** Aprovado  
**Responsável:** Sofia (CTO)  
**Última Atualização:** 2026-01-08

---

> [!IMPORTANT]  
> **Status de Segurança:** Todas as tabelas possuem **RLS (Row Level Security)** habilitado. O acesso a propostas é feito exclusivamente via função `get_proposal_by_code` para evitar exposição direta de IDs.

---

## 1. Feature Tables (Propostas)

### `proposals`
**Descrição:** Armazena os dados mestre das propostas enviadas aos clientes.

**Colunas:**
| Nome | Tipo | Nullable | Default | FK | Observações |
|------|------|----------|---------|-----|-------------|
| id | uuid | NO | gen_random_uuid() | - | Primary key |
| created_at | timestamptz | NO | now() | - | Auditoria |
| client_name | varchar(255) | NO | - | - | Nome da empresa/pessoa |
| project_title| varchar(255) | NO | - | - | Ex: "Automação IA v1" |
| access_code | varchar(20) | NO | - | - | UNIQUE. Código PIN (Ex: ST4829X) |
| content_json | jsonb | NO | '{}' | - | Dados modulares do template |
| expires_at | timestamptz | YES | - | - | Validez da proposta |
| status | varchar(50) | NO | 'draft' | - | draft, sent, accepted, declined |

**Índices:**
- `idx_proposals_access_code` on `access_code` - Busca ultra-rápida no unlock.
- `idx_proposals_status` on `status` - Filtragem administrativa.

**RLS Policies:**
- **Nome:** `Public select by code (via function)`
  - **Tipo:** SELECT
  - **Status:** Desabilitado para acesso direto. Acesso permitido apenas via RPC.

---

### `proposal_analytics`
**Descrição:** Log de eventos de interação para funil de conversão.

**Colunas:**
| Nome | Tipo | Nullable | Default | FK | Observações |
|------|------|----------|---------|-----|-------------|
| id | bigint | NO | - | - | PK (Generated Always) |
| proposal_id | uuid | YES | - | proposals(id) | Referência opcional (null em erro) |
| event_type | varchar(50) | NO | - | - | unlock, view, click_accept, click_wa |
| metadata | jsonb | YES | '{}' | - | IP, User-Agent, Timestamp secundário |
| created_at | timestamptz | NO | now() | - | Momento do evento |

**Relacionamentos de Saída:**
- `proposal_id` -> `proposals.id` (ON DELETE SET NULL)

**Índices:**
- `idx_analytics_proposal_id` on `proposal_id` - JOINs para relatórios.

**RLS Policies:**
- **Nome:** `Allow anonymous insert`
  - **Tipo:** INSERT
  - **Condição:** `true` (público)
- **Nome:** `Admin full access`
  - **Tipo:** ALL
  - **Condição:** `auth.role() = 'authenticated'`

---

## 2. Funções (Business Logic / Security)

### `get_proposal_public_metadata(p_id UUID)`
**Retorna:** `TABLE(id, client_name, project_title, status, expires_at)`  
**Descrição:** Busca APENAS metadados públicos para exibição no estado "Locked". NÃO retorna `content_json` ou `access_code`.  
**Segurança:** SECURITY DEFINER com validação de expiração e Soft Delete.

**SQL:**
```sql
CREATE OR REPLACE FUNCTION get_proposal_public_metadata(p_id UUID)
RETURNS TABLE(
  id UUID,
  client_name VARCHAR(255),
  project_title VARCHAR(255),
  status VARCHAR(50),
  expires_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.client_name, p.project_title, p.status, p.expires_at
  FROM proposals p
  WHERE p.id = p_id 
  AND p.status != 'ARCHIVED'
  AND (p.expires_at IS NULL OR p.expires_at > now());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

### `get_proposal_by_code(p_code TEXT)`
**Retorna:** `SETOF proposals`  
**Descrição:** Busca segura de proposta COMPLETA (incluindo content_json). Valida PIN e expiração.

**SQL:**
```sql
CREATE OR REPLACE FUNCTION get_proposal_by_code(p_code TEXT)
RETURNS SETOF proposals AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM proposals
  WHERE access_code = p_code
  AND status != 'ARCHIVED'
  AND (expires_at IS NULL OR expires_at > now());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 3. Environment Mapping (Migration-Ready)

| Tabela | Ambiente | Provider | Configuração |
|--------|----------|----------|--------------|
| `proposals` | Produção | Supabase | Iana HUB Project |
| `proposal_analytics` | Produção | Supabase | Iana HUB Project |

**Migration Script:** `sql/20260108_initial_schema.sql` (Verificado e aprovado para execução).

---

*Documento gerado e validado por Sofia (CTO).*
