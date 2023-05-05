import { Suspense } from 'react'
import Loading from '../loading'
import Permission from '../permission'

/**
 * @param Component 懒加载的组件
 * @param code 用于判断权限的字段(你可以自己定)
 * @returns
 */
const LazyLoad = (
  // Component: React.LazyExoticComponent<() => JSX.Element>,
  Component: React.FC,
  code?: string
) => {
  return (
    <Permission code={code}>
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </Permission>
  )
}

export default LazyLoad
