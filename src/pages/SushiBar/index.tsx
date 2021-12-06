import React from 'react'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { Helmet } from 'react-helmet'
import XSushiSign from '../../assets/images/xsushi-text-sign.png'
import InfoCard from './InfoCard'
import APRCard from './APRCard'
import StakeCard from './StakeCard'
import BalanceCard from './BalanceCard'
import { ChainId } from 'quest-regoswap-sdk'
import { SUSHI, XSUSHI, REGO, xREGO } from '../../constants'
import useTokenBalance from '../../hooks/useTokenBalance'

const mockData = {
    sushiEarnings: 345.27898,
    weightedApr: 15.34
}

export default function XSushi() {
    const { account, chainId } = useActiveWeb3React()

// mainnet    
    // const sushiBalance = useTokenBalance(SUSHI[ChainId.MAINNET]?.address ?? '')
    // const xSushiBalance = useTokenBalance(XSUSHI?.address ?? '')

// Rinkeby
    
    // const sushiBalance = useTokenBalance(RADIO[ChainId.RINKEBY]?.address ?? '')
    // const xSushiBalance = useTokenBalance(xRadio?.address ?? '')
  
// matic    
    const sushiBalance = useTokenBalance(
        (chainId === ChainId.MATIC)
        ? 
        REGO[ChainId.MATIC]?.address ?? ''
        :
        (chainId === ChainId.RINKEBY)
        ? 
        REGO[ChainId.RINKEBY ]?.address ?? ''
        :
        (chainId === ChainId.MAINNET)
        ? 
        REGO[ChainId.MAINNET ]?.address ?? ''
        :
        REGO[ChainId.BSC ]?.address ?? ''
        )
        
    const xSushiBalance = useTokenBalance(
        (chainId === ChainId.MATIC)
        ?
        xREGO[ChainId.MATIC]?.address ?? ''
        :
        (chainId === ChainId.RINKEBY)
        ?
        xREGO[ChainId.RINKEBY]?.address ?? ''
        :
        (chainId === ChainId.MAINNET)
        ?
        xREGO[ChainId.MAINNET]?.address ?? ''
        :
        xREGO[ChainId.BSC]?.address ?? ''
        )

    return (
        <>
            <Helmet>
                <title>xREGO | Regoswap</title>
            </Helmet>
            <div className="flex flex-col w-full min-h-fitContent">
                <div className="flex mb-6 justify-center">
                    <InfoCard />
                    <div className="hidden md:flex justify-center align-center w-72 ml-6">
                        <img src={XSushiSign} alt={'xsushi sign'} />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col max-w-xl w-full">
                        <div className="mb-4">
                            <APRCard />
                        </div>
                        <div>
                            <StakeCard sushiBalance={sushiBalance} xSushiBalance={xSushiBalance} />
                        </div>
                    </div>
                    <div className="hidden md:block w-72 ml-6">
                        <BalanceCard
                            sushiEarnings={mockData.sushiEarnings}
                            xSushiBalance={xSushiBalance}
                            sushiBalance={sushiBalance}
                            weightedApr={mockData.weightedApr}
                        />
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <div className="md:hidden flex justify-center w-full max-w-xl mt-6 mb-20">
                        <BalanceCard
                            sushiEarnings={mockData.sushiEarnings}
                            xSushiBalance={xSushiBalance}
                            sushiBalance={sushiBalance}
                            weightedApr={mockData.weightedApr}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
