import unittest

from support import run_solution


class Divide33968By176Test(unittest.TestCase):
    def test_case_01_no_input(self):
        """No input."""
        result = run_solution('divide-33968-by-176', '')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '193.0\n')

    def test_edge_01_extra_stdin_is_ignored(self):
        """Extra stdin is ignored."""
        result = run_solution('divide-33968-by-176', 'ignored\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '193.0\n')


if __name__ == "__main__":
    unittest.main()
