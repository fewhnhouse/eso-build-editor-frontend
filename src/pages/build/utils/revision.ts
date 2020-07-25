import { IBuildState } from '../BuildStateContext'
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo'
import { createNewBuild } from './create'

export const handleAddRevision = async (
  createSkillSelections: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<ExecutionResult<any>>,
  createSetSelections: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<ExecutionResult<any>>,
  createBuild: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<ExecutionResult<any>>,
  addBuildToRevision: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<ExecutionResult<any>>,
  state: IBuildState
) => {
  const build: any = await createNewBuild(
    createSkillSelections,
    createSetSelections,
    createBuild,
    state
  )
  if (build && build.data && state.revision) {
    await addBuildToRevision({
      variables: { id: state.revision.id, buildId: build.data.createBuild.id },
    })
  }
}
