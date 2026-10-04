import process from 'node:process';
if (Number(process.versions.node.split('.')[0]) !== 24) {
  throw new Error('Outcome Ledger requires Node 24. Select the version in .nvmrc.');
}
