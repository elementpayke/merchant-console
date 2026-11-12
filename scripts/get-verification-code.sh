#!/usr/bin/env bash
# Local-dev helper: SMTP isn't configured locally, so verification emails never
# arrive. This reads the 6-digit code straight from the aggregator's database.
#   ./scripts/get-verification-code.sh you@example.com
set -euo pipefail

EMAIL="${1:?usage: $0 <email>}"
AGG_DIR="${AGG_DIR:-$HOME/kazi/company/ELEMENTPAY/element-pay-aggregator}"

"$AGG_DIR/.venv/bin/python" - "$EMAIL" <<'EOF'
import asyncio, re, sys
email = sys.argv[1]
env = open(f"{__import__('os').environ.get('AGG_DIR', __import__('os').path.expanduser('~/kazi/company/ELEMENTPAY/element-pay-aggregator'))}/.env").read()
m = re.search(r'DATABASE_URL=mysql\+aiomysql://([^:]+):([^@]+)@([^:/]+):(\d+)/(\S+)', env)
user, pw, host, port, db = m.groups()
import aiomysql
async def main():
    conn = await aiomysql.connect(host=host, port=int(port), user=user, password=pw, db=db)
    cur = await conn.cursor()
    await cur.execute("SELECT verification_code, email_verified FROM users WHERE email=%s", (email,))
    row = await cur.fetchone()
    if not row:
        print(f"No user found for {email}")
    elif row[1]:
        print(f"{email} is already verified.")
    else:
        print(f"Verification code for {email}: {row[0]}")
    conn.close()
asyncio.run(main())
EOF
