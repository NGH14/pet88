
import {styled} from "styled-components"

export const CountingContainer = styled.section`
  font-size: ${props => props.$size ? props.$size : "1em"}
  font-weight: ${props => props.$weight ? props.$weight : 800}
`
