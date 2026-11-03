-- Vannah 1.7: READ-ONLY Supabase checks. These queries DO NOT create or change policies.
-- Run in the Supabase SQL editor and review the results before admitting real users.
-- A policy being present does not prove correct isolation; perform cross-account tests.

-- 1. Which public tables have row-level security enabled?
select n.nspname as schema_name, c.relname as table_name, c.relrowsecurity as rls_enabled,
       c.relforcerowsecurity as force_rls
from pg_class c join pg_namespace n on n.oid=c.relnamespace
where n.nspname='public' and c.relkind in ('r','p')
order by c.relname;

-- 2. What policies are configured on public tables?
select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
from pg_policies where schemaname='public'
order by tablename, policyname;

-- 3. Verify grants. anon/authenticated grants still require secure RLS policies.
select table_schema, table_name, grantee, privilege_type
from information_schema.role_table_grants
where table_schema='public' and grantee in ('anon','authenticated')
order by table_name,grantee,privilege_type;

-- Manual verification required:
-- [ ] A user from Company A cannot SELECT Company B records.
-- [ ] Company A cannot INSERT/UPDATE/DELETE data on behalf of Company B.
-- [ ] Contact/project/invoice/finance relationships are constrained to the same company.
-- [ ] Unauthenticated users cannot access business data.
-- [ ] No service_role key, secrets, tokens, or passwords in client-side code.
-- [ ] Email verification, password recovery and account onboarding are tested.
-- [ ] Pagination, schema constraints and totals are tested with >200 records.
-- [ ] Invoice paid amounts and finance entries reconcile without duplicates.
-- [ ] Payment dates are stored before advertising accurate monthly cash-flow reporting.
