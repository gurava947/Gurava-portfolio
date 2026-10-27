import unittest

from support import run_solution


class Multiply3761And391Test(unittest.TestCase):
    def test_case_01_no_input(self):
        """No input."""
        result = run_solution('multiply-37-61-and-391', '')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '882487\n')

    def test_edge_01_extra_stdin_is_ignored(self):
        """Extra stdin is ignored."""
        result = run_solution('multiply-37-61-and-391', 'ignored\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '882487\n')


if __name__ == "__main__":
    unittest.main()
