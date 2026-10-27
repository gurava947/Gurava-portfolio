import unittest

from support import run_solution


class Subtract596From193856Test(unittest.TestCase):
    def test_case_01_no_input(self):
        """No input."""
        result = run_solution('subtract-596-from-193856', '')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '193260\n')

    def test_edge_01_extra_stdin_is_ignored(self):
        """Extra stdin is ignored."""
        result = run_solution('subtract-596-from-193856', 'ignored\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '193260\n')


if __name__ == "__main__":
    unittest.main()
