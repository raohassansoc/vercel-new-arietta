import { PageHeader, PageHeaderProps } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'

const MarketPageHeader: React.FC<React.PropsWithChildren<PageHeaderProps>> = (props) => {
  const { theme } = useTheme()
  const background = theme.isDark
    ? 'linear-gradient(166.77deg, #1c170c 0%, #1b160e 100%)'
    : 'linear-gradient(111.68deg, #f2ecf2 0%, #e8f2f6 100%)'
  return <PageHeader background={background} {...props} />
}

export default MarketPageHeader
