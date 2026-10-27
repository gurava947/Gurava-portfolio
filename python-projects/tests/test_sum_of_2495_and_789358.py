import unittest

from support import run_solution


class SumOf2495And789358Test(unittest.TestCase):
    def test_case_01_no_input(self):
        """No input."""
        result = run_solution('sum-of-2495-and-789358', '')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '791853\n')

    def test_edge_01_extra_stdin_is_ignored(self):
        """Extra stdin is ignored."""
        result = run_solution('sum-of-2495-and-789358', 'ignored\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '791853\n')


if __name__ == "__main__":
    unittest.main()
