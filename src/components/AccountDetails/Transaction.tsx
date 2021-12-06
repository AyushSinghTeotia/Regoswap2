import React from 'react'
import { CheckCircle, Triangle } from 'react-feather'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useAllTransactions } from '../../state/transactions/hooks'
import { ExternalLink } from '../../theme'
import { getExplorerLink } from '../../utils'
import Loader from '../Loader'
import { RowFixed } from '../Row'

const TransactionWrapper = styled.div``

const TransactionStatusText = styled.div`
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
    :hover {
        text-decoration: underline;
    }
`

const TransactionState = styled(ExternalLink)<{ pending: boolean; success?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none !important;
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 0.25rem 0rem;
    font-weight: 500;
    font-size: 0.825rem;
    color: ${({ theme }) => theme.primary1};
`

const IconWrapper = styled.div<{ pending: boolean; success?: boolean }>`
    color: ${({ pending, success, theme }) => (pending ? theme.primary1 : success ? theme.green1 : theme.red1)};
`

export default function Transaction({ hash }: { hash: string }): any {
    const { chainId } = useActiveWeb3React()
    const allTransactions = useAllTransactions()

    const tx = allTransactions?.[hash]
    const summary = tx?.summary
    const pending = !tx?.receipt
    const success = !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined')

    if (!chainId) return null

    return (
        <TransactionWrapper>
            <TransactionState href={getExplorerLink(chainId, hash, 'transaction')} pending={pending} success={success}>
                <RowFixed>
                    <TransactionStatusText>{summary ?? hash} ↗</TransactionStatusText>
                </RowFixed>
                <IconWrapper pending={pending} success={success}>
                    {pending ? <Loader /> : success ? <CheckCircle size="16" /> : <Triangle size="16" />}
                </IconWrapper>
            </TransactionState>
        </TransactionWrapper>
    )
}