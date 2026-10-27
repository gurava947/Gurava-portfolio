import unittest

from support import run_solution


class SimpleTriangle4Test(unittest.TestCase):
    def test_case_01_no_input(self):
        """No input."""
        result = run_solution('simple-triangle-4', '')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '+\n++\n+++\n')

    def test_edge_01_extra_stdin_ignored(self):
        """Extra stdin ignored."""
        result = run_solution('simple-triangle-4', 'ignored\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '+\n++\n+++\n')


if __name__ == "__main__":
    unittest.main()
